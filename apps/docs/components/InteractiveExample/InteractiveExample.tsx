"use client";

import {
  SandpackCodeEditor,
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
  type SandpackFiles,
} from "@codesandbox/sandpack-react";

import type { InteractiveExampleProps } from "./types";
import "./InteractiveExample.css";

export default function InteractiveExample({
  files,
  dependencies = {},
  externalResources = [],
  template,
}: InteractiveExampleProps) {
  // This is due to the rehype plugin passing the files attribute as a string
  const sandpackFiles: SandpackFiles = JSON.parse(files);

  return (
    <SandpackProvider
      files={sandpackFiles}
      template={template ?? "react"}
      // TODO: Figure out how to use the same theme as browser
      theme="dark"
      customSetup={{
        dependencies,
      }}
      options={{
        externalResources: [
          "https://cdn.tailwindcss.com",
          ...externalResources,
        ],
      }}
    >
      <div className="mt-6 flex flex-col">
        <SandpackLayout className="flex h-[776px] flex-col">
          <SandpackCodeEditor
            showLineNumbers
            showReadOnly={false}
            showRunButton
            showTabs
            className="sandpack-editor mb-2"
          />
          <SandpackPreview />
        </SandpackLayout>
      </div>
    </SandpackProvider>
  );
}
