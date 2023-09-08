import type { FC, HTMLAttributes } from "react";
import formatHighlight, { ColorsOptions } from "./formatHighlight";

const COLORS_OPTIONS: ColorsOptions = {
  keyColor: "#eb5edd",
  stringColor: "#40ff63",
};

interface JsonProps extends HTMLAttributes<HTMLElement> {
  object: object;
}

const Json: FC<JsonProps> = ({ object, ...props }) => (
  <code
    dangerouslySetInnerHTML={{
      __html: formatHighlight(object, COLORS_OPTIONS),
    }}
    {...props}
  />
);

export default Json;
