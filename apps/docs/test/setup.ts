import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach } from "vitest";
import { server } from "@mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});

afterEach(() => {
  cleanup();
});
