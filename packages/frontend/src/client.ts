import "./meta/client";
import { hydrate } from "react-dom";
import { createElement } from "react";
import { loadableReady } from "@loadable/component";
import { App } from "./app/components/App";
import { getApolloClient } from "./app/lib/getApolloClient";

void loadableReady(() => {
    hydrate(createElement(App, { client: getApolloClient() }), document.getElementById("root"));
});
