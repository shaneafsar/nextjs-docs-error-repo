import type { InteractiveExampleProps } from "./types";
import InteractiveExample from "./InteractiveExample";

export default function InteractiveExampleServer(
  props: InteractiveExampleProps
) {
  return <InteractiveExample {...props} />;
}
