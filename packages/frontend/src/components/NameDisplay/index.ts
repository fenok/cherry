import loadable from "@loadable/component";
const NameDisplay = loadable(() => import("./NameDisplay"));

export { NameDisplay };
export type { Props } from "./NameDisplay";
