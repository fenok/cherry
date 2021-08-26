import { FC } from "react";
import { styled } from "@linaria/react";

const Greeting: FC = () => <FancySpan>Hello, world!</FancySpan>;

const FancySpan = styled.span`
    font-size: 42px;
    font-family: sans-serif;
    font-weight: bold;
    background: linear-gradient(to right, #e66465, #9198e5);
    -webkit-background-clip: text;
    color: transparent;
`;

export { Greeting };
export default Greeting;
