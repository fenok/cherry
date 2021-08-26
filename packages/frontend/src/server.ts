import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createElement } from "react";
import { ChunkExtractor } from "@loadable/server";
import { App } from "./components/App";
import { Html } from "./components/Html";

export interface RenderOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    stats: object;
}

export interface RenderResult {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
}

export function render({ stats }: RenderOptions): Promise<RenderResult> {
    const app = createElement(App);

    const extractor = new ChunkExtractor({ stats, publicPath: "/" });

    const content = renderToString(extractor.collectChunks(app));

    const html = createElement(Html, {
        content,
        scripts: extractor.getScriptElements(),
        links: extractor.getLinkElements(),
        styles: extractor.getStyleElements(),
    });

    return Promise.resolve({ statusCode: 200, body: `<!DOCTYPE html>${renderToStaticMarkup(html)}` });
}
