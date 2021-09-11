import { FC, ReactElement } from "react";
import { NormalizedCacheObject } from "@apollo/client";

interface HtmlProps {
    content: string;
    apolloState: NormalizedCacheObject;
    scripts: ReactElement[];
    links: ReactElement[];
    styles: ReactElement[];
}

const Html: FC<HtmlProps> = ({ content, apolloState, links, scripts, styles }) => (
    <html>
        <head>
            {links}
            {styles}
        </head>
        <body>
            <div id={"root"} dangerouslySetInnerHTML={{ __html: content }} />

            <script
                dangerouslySetInnerHTML={{
                    __html: Object.entries({
                        __PUBLIC_CONFIG__: JSON.stringify(__PUBLIC_CONFIG__),
                        __APOLLO_STATE__: JSON.stringify(apolloState).replace(/</g, "\\u003c"),
                    })
                        .map(([key, value]) => `window.${key}=${value};`)
                        .join(""),
                }}
            />
            {scripts}
        </body>
    </html>
);

export { Html };
export type { HtmlProps };
