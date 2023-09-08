import SwaggerParser from "@apidevtools/swagger-parser";
import { z } from "zod";
import type { Method } from "contentlayer/generated";
import { baseUrl } from "@constants";

const specSchema = z.object({
  openapi: z.string(),
  info: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
  }),
  components: z.object({
    securitySchemes: z.object({
      appId: z.object({
        type: z.string(),
        in: z.string(),
        name: z.string(),
      }),
      apiKey: z.object({
        type: z.string(),
        in: z.string(),
        name: z.string(),
      }),
    }),
  }),
  servers: z.array(
    z.object({
      url: z.string(),
      variables: z.object({
        appId: z.object({
          default: z.string(),
        }),
      }),
    })
  ),
  security: z.array(
    z.object({
      appId: z.array(z.string()).default([]),
      apiKey: z.array(z.string()).default([]),
    })
  ),
  tags: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      "x-displayName": z.string().optional(),
    })
  ),
  "x-tagGroups": z
    .array(
      z.object({
        name: z.string(),
        tags: z.array(z.string()),
      })
    )
    .optional(),
  paths: z.record(
    z.record(
      z.object({
        operationId: z.string(),
        "x-use-read-transporter": z.boolean().optional(),

        summary: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        parameters: z.array(
          z.object({
            name: z.string(),
            in: z.string(),
            description: z.string(),
            required: z.boolean(),
            schema: z.object({
              type: z.string(),
              example: z.string(),
            }),
          })
        ),
        responses: z.record(
          z.object({
            description: z.string(),
            content: z.record(
              z.object({
                schema: z.object({
                  description: z.string().optional(),
                  type: z.string(),
                  additionalProperties: z.boolean(),
                  properties: z.record(
                    z.object({
                      type: z.string(),
                      description: z.string().optional(),
                      example: z.string(),
                      "x-categories": z.array(z.string()).optional(),
                      minimum: z.number().optional(),
                      maximum: z.number().optional(),
                      default: z
                        .union([
                          z.string(),
                          z.boolean(),
                          z.number(),
                          z.array(z.string()),
                        ])
                        .optional(),
                    })
                  ),
                }),
              })
            ),
          })
        ),
      })
    )
  ),
});

type Spec = z.infer<typeof specSchema>;

export const getSpec = async (specName: string): Promise<Spec> => {
  return require(`public/specs/${specName}.json`);
};

// Get the REST API paths from the spec by converting it into JSON and transforming the response
// Then get the SDK methods from the method collection, and filter out the excluded paths
export const getSpecPaths = async (
  spec: Spec,
  excludePaths: string[],
  allMethods: Method[]
) => {
  const paths = Object.keys(spec.paths).map((p) => {
    return {
      name: p,
      data: Object.entries(spec.paths[p]).map((pathVerb) => {
        const pathVerbData = pathVerb[1];
        return { ...pathVerbData, verb: pathVerb[0] };
      }),
    };
  });

  const pathsWithSdkMethods = paths.map(async (path) => {
    const transformedPathName = path.name
      .replace(/\/1\/|[{}]/g, "")
      .replace(/[/]/g, "-")
      .toLowerCase();
    return {
      ...path,
      sdkMethods: allMethods.find(
        (method) => method.slug == transformedPathName
      ),
    };
  });

  return Promise.all(pathsWithSdkMethods).then((paths) =>
    paths.filter((specPath) => !excludePaths.includes(specPath.name))
  );
};

export const getTags = (spec: Spec) => {
  return spec.tags;
};

export const getTagGroups = (spec: Spec, excludeTagGroups: string[]) => {
  return spec["x-tagGroups"]
    ? spec["x-tagGroups"].filter(
        (tagGroup) => !excludeTagGroups.includes(tagGroup.name)
      )
    : [{ name: "General", tags: spec.tags.map((t) => t.name) }];
};

// Get additional methods that don't exist in the spec
export const getAdditionalMethods = async (
  methods: string[],
  allMethods: Method[]
) => {
  if (methods.length === 0) return [];

  const methodPromises = methods.map((method) => {
    return allMethods.find((m) => m.slug == method);
  });
  return Promise.all(methodPromises);
};

export const getPathsByTagGroup = async (
  spec: Spec,
  excludePaths: string[],
  excludeTagGroups: string[],
  allMethods: Method[]
) => {
  const paths = await getSpecPaths(spec, excludePaths, allMethods);
  const tagGroups = getTagGroups(spec, excludeTagGroups);

  return tagGroups.map((tagGroup) => {
    const pathsForTagGroups = paths.filter(
      (path) => path.data[0].tags !== undefined
    );
    return {
      ...tagGroup,
      paths: pathsForTagGroups.filter((path) => {
        if (path.data[0].tags && path.data[0].tags.length > 0) {
          return tagGroup.tags.includes(path.data[0].tags[0]);
        }
        return false;
      }),
    };
  });
};
