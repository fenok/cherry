import { hydrate } from "react-dom";
import { createElement } from "react";
import { App } from "./components/App";

hydrate(createElement(App), document.getElementById("root"));
