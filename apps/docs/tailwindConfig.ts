import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export default fullConfig;

export type Color = keyof typeof fullConfig.theme.extend.colors;
