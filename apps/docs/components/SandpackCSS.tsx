"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

// https://sandpack.codesandbox.io/docs/guides/ssr#nextjs-app-dir
export default function SandpackCSS() {
  useServerInsertedHTML(() => (
    <style
      dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
      id="sandpack"
    />
  ));

  return null;
}
