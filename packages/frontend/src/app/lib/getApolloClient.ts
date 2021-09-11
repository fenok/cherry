import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

export interface ApolloClientOptions {
    fetch?: typeof fetch;
}

export function getApolloClient({ fetch }: ApolloClientOptions = {}) {
    const cache = new InMemoryCache();

    if (!SSR_MODE && __APOLLO_STATE__) {
        cache.restore(__APOLLO_STATE__);
    }

    return new ApolloClient({
        ssrForceFetchDelay: 100,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
                errorPolicy: "all",
            },
            mutate: {
                errorPolicy: "all",
            },
        },
        ssrMode: SSR_MODE,
        cache,
        link: createPersistedQueryLink({ sha256 }).concat(
            new HttpLink({ uri: __PUBLIC_CONFIG__.GRAPHQL_ENDPOINT, fetch })
        ),
    });
}
