import { FC } from "react";

interface HtmlProps {
    content: string;
}

const Html: FC<HtmlProps> = ({ content }) => (
    <html>
        <body>
            <div id={"root"} dangerouslySetInnerHTML={{ __html: content }} />
            <script src={"/main.js"} />
        </body>
    </html>
);

export { Html };
export type { HtmlProps };
