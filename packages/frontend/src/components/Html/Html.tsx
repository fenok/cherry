import { FC, ReactElement } from "react";

interface HtmlProps {
    content: string;
    scripts: ReactElement[];
    scriptLinks: ReactElement[];
}

const Html: FC<HtmlProps> = ({ content, scriptLinks, scripts }) => (
    <html>
        <head>{scriptLinks}</head>
        <body>
            <div id={"root"} dangerouslySetInnerHTML={{ __html: content }} />
            {scripts}
        </body>
    </html>
);

export { Html };
export type { HtmlProps };
