import "./meta/server";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createElement } from "react";
import { ChunkExtractor } from "@loadable/server";
import { App } from "./app/components/App";
import { Html } from "./app/components/Html";
import { getApolloClient } from "./app/lib/getApolloClient";
import fetch from "cross-fetch";
import { getDataFromTree } from "@apollo/client/react/ssr";

export interface RenderOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    stats: object;
}

export interface RenderResult {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
}

export async function render({ stats }: RenderOptions): Promise<RenderResult> {
    const client = getApolloClient({ fetch });
    const extractor = new ChunkExtractor({ stats, publicPath: "/" });

    const app = extractor.collectChunks(createElement(App, { client }));

    await getDataFromTree(app);

    const content = renderToString(app);

    const html = createElement(Html, {
        content,
        apolloState: client.extract(),
        scripts: extractor.getScriptElements(),
        links: extractor.getLinkElements(),
        styles: extractor.getStyleElements(),
    });

    return Promise.resolve({ statusCode: 200, body: `<!DOCTYPE html>${renderToStaticMarkup(html)}` });
}
