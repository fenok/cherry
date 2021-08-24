import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createElement } from "react";
import { App } from "./components/App";
import { Html } from "./components/Html";

export interface SsrResult {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
}

export function render(): Promise<SsrResult> {
    const app = createElement(App);

    const html = createElement(Html, { content: renderToString(app) });

    return Promise.resolve({ statusCode: 200, body: `<!DOCTYPE html>${renderToStaticMarkup(html)}` });
}
