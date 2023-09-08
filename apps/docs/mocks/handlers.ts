import { rest } from "msw";
import { setTimeout } from "timers/promises";

import {
  authenticatedUserFixture,
  unauthenticatedUserFixture,
} from "./fixtures/auth";
import { applications } from "./fixtures/application";
import { APPLICATIONS_URL, AUTH_URL, ZENDESK_API_URL } from "../constants";

const forceAuth = Boolean(process.env.AUTH_MOCKING === "enabled");

export default [
  rest.get(AUTH_URL, async (_req, res, ctx) => {
    if (!forceAuth) {
      return res(ctx.json(unauthenticatedUserFixture.user));
    }

    return res(
      ctx.set({
        "x-csrf-token": authenticatedUserFixture.authenticityToken,
      }),
      ctx.json(authenticatedUserFixture.user)
    );
  }),
  rest.get(APPLICATIONS_URL, async (_req, res, ctx) => {
    return res(ctx.json(applications));
  }),
  rest.post(ZENDESK_API_URL, async (_, res, ctx) => {
    await setTimeout(1000);
    return res(ctx.json({ success: true }));
  }),

  rest.post("/test/feedback", async (_req, res, ctx) => {
    await setTimeout(1000);
    return res(ctx.json({ success: true }));
  }),
  rest.get("/test/api/auth", async (_req, res, ctx) => {
    return res(
      ctx.json({
        user: authenticatedUserFixture.user,
        applications: applications,
        authenticityToken: authenticatedUserFixture.authenticityToken,
      })
    );
  }),
];
