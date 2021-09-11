import { FC } from "react";
import { MainPage } from "../MainPage";
import "./globalStyle";
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from "@apollo/client";

interface AppProps {
    client: ApolloClient<NormalizedCacheObject>;
}

const App: FC<AppProps> = ({ client }) => (
    <ApolloProvider client={client}>
        <MainPage />
    </ApolloProvider>
);

export { App };
