import { BASE_URL, basePath } from "../../playwright.config";

// remove double slashes from urls
export const COMPONENT_TEST_URL = (BASE_URL + basePath + "/_test/components").replace(/([^:]\/)\/+/g, "$1");
export const CONTENT_TEST_URL = (BASE_URL + basePath + "/_test/content").replace(/([^:]\/)\/+/g, "$1");
export const GATE_TEST_URL = (BASE_URL + basePath + "/_test/gated-content").replace(/([^:]\/)\/+/g, "$1");
