(global as unknown as { __PUBLIC_CONFIG__: typeof __PUBLIC_CONFIG__ }).__PUBLIC_CONFIG__ = {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT || "https://cherry-apollo.glitch.me",
};

export {};
