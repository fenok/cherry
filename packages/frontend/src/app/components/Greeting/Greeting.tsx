import { FC } from "react";
import { styled } from "@linaria/react";
import { useQuery } from "@apollo/client";
import { ENTITY_QUERY } from "./graphql";
import { GetEntity } from "./ApolloTypes/GetEntity";

const Greeting: FC = () => {
    const { data } = useQuery<GetEntity>(ENTITY_QUERY);

    return <FancySpan>Hello, {data?.entity.name}!</FancySpan>;
};

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
