import { NormalizedCacheObject } from "@apollo/client";

declare global {
    /** Webpack-defined */
    const SSR_MODE: boolean;

    /** Config */
    const __PUBLIC_CONFIG__: {
        readonly GRAPHQL_ENDPOINT: string;
        readonly PUBLIC_PATH: string;
    };

    /** Dynamic server data */
    const __APOLLO_STATE__: NormalizedCacheObject | undefined;
}
