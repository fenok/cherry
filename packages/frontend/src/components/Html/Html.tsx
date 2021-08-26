import { FC, ReactElement } from "react";

interface HtmlProps {
    content: string;
    scripts: ReactElement[];
    links: ReactElement[];
    styles: ReactElement[];
}

const Html: FC<HtmlProps> = ({ content, links, scripts, styles }) => (
    <html>
        <head>
            {links}
            {styles}
        </head>
        <body>
            <div id={"root"} dangerouslySetInnerHTML={{ __html: content }} />
            {scripts}
            {/** @see https://stackoverflow.com/a/42969608 */}
            <script> </script>
        </body>
    </html>
);

export { Html };
export type { HtmlProps };
