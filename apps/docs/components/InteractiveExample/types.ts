import type { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react/types";

export type InteractiveExampleProps = {
  files: string;
  // NPM dependencies to add inside of the sandbox.
  dependencies?: Record<string, string>;
  externalResources?: string[];
  template?: SandpackPredefinedTemplate;
};
