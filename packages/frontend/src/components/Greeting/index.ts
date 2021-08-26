import loadable from "@loadable/component";
const Greeting = loadable(() => import("./Greeting"));

export { Greeting };
