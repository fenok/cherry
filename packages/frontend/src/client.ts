import { hydrate } from "react-dom";
import { createElement } from "react";
import { loadableReady } from "@loadable/component";
import { App } from "./components/App";

void loadableReady(() => {
    hydrate(createElement(App), document.getElementById("root"));
});
