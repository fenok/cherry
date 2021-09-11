import { FC, useState } from "react";
import { Greeting } from "../Greeting";
import { Button } from "../Button";
import { styled } from "@linaria/react";

const MainPage: FC = () => {
    const [display, setDisplay] = useState(false);

    return display ? <Greeting /> : <PositionedButton onClick={() => setDisplay(true)}>Greet</PositionedButton>;
};

const PositionedButton = styled(Button)`
    margin: 10px;
`;

export { MainPage };
