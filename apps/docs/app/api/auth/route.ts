import crypto from "crypto";

import * as Sentry from "@sentry/node";
import type { User } from "@store/auth";
import { APPLICATIONS_URL, AUTH_URL } from "@constants";
import { authenticatedAlgoliaEmployeeFixture } from "@mocks/fixtures/auth";
import { applications } from "@mocks/fixtures/application";

export const dynamic = "force-dynamic";

const getUserGravatar = (user: User) => {
  const hash = crypto
    .createHash("md5")
    .update(user.user_email?.toLowerCase() ?? "")
    .digest("hex");

  return `https://secure.gravatar.com/avatar/${hash}?d=404&r=PG&s=128`;
};

const mockEndpoint = () => {
  let user: any = authenticatedAlgoliaEmployeeFixture.user;
  const authenticityToken =
    authenticatedAlgoliaEmployeeFixture.authenticityToken;

  user.avatar = getUserGravatar(user);

  return new Response(
    JSON.stringify({
      user,
      authenticityToken,
      applications,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const GET = async (req: Request) => {
  // NOTE: Mocking here instead of with MSW as MSW does not yet have support for app router.
  if (process.env.AUTH_MOCKING === "enabled") {
    return mockEndpoint();
  }

  try {
    const cookies = req.headers.get("cookie");

    const res = await fetch(AUTH_URL, {
      headers: {
        cookie: cookies ?? "",
      },
    });

    const authenticityToken = res.headers.get("x-csrf-token");

    let user = await res.json();

    const isLoggedIn = !!user?.user_email;

    // Dashboard API returns anonymous_id instead of user_id for non authenticated users.
    // To simplify our client logic, we'll just use anonymous_id as user_id for non authenticated users.
    if (!isLoggedIn && user?.anonymous_id) {
      user.user_id = user.anonymous_id;
      delete user.anonymous_id;
    }

    let applications = [];

    if (isLoggedIn) {
      const gravatarUrl = getUserGravatar(user);

      user.avatar = gravatarUrl;

      const applicationRes = await fetch(APPLICATIONS_URL, {
        headers: {
          cookie: cookies ?? "",
        },
      });

      if (applicationRes.ok) {
        applications = await applicationRes.json().catch(() => {});
      }
    }

    return new Response(
      JSON.stringify({
        user,
        authenticityToken,
        applications,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
    return new Response(JSON.stringify({ user: null, applications: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
