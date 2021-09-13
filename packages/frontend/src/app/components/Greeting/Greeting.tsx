import { FC } from "react";
import { styled } from "@linaria/react";
import { useQuery } from "@apollo/client";
import { ENTITY_QUERY } from "./graphql";
import { GetEntity } from "./apollo-types/GetEntity";
import tsLogoUrl from "./ts-logo.svg";
import serviceDogUrl from "./service-dog.png";
import TsLogoSvg from "./ts-logo.svg?svgr";

const Greeting: FC = () => {
    const { data } = useQuery<GetEntity>(ENTITY_QUERY);

    return (
        <>
            <FancySpan>Hello, {data?.entity.name}!</FancySpan>
            <ImagesContainer>
                <ServiceDogBackgroundImage />
                <TsLogoBackgroundImage />
                <TsLogoSvg width={100} height={100} />
                <Image src={tsLogoUrl} />
                <Image src={serviceDogUrl} />
            </ImagesContainer>
        </>
    );
};

const ImagesContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
`;

const TsLogoBackgroundImage = styled.div`
    display: inline-block;
    width: 100px;
    height: 100px;
    background-image: url("./ts-logo.svg");
    background-size: contain;
`;
const ServiceDogBackgroundImage = styled.div`
    display: inline-block;
    width: 100px;
    height: 100px;
    background: url(${serviceDogUrl});
    background-size: contain;
`;

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
