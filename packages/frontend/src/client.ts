import { hydrate } from "react-dom";
import { createElement } from "react";
import { loadableReady } from "@loadable/component";
import { App } from "./components/App";
import { getApolloClient } from "./lib/getApolloClient";

void loadableReady(() => {
    hydrate(createElement(App, { client: getApolloClient() }), document.getElementById("root"));
});
