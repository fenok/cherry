let localPublicConfig: Partial<typeof __PUBLIC_CONFIG__> = {};

try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    localPublicConfig = require("../../local.public.config.js");
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.code !== "MODULE_NOT_FOUND") {
        throw e;
    }
    // No local config, we're good.
}

(global as unknown as { __PUBLIC_CONFIG__: typeof __PUBLIC_CONFIG__ }).__PUBLIC_CONFIG__ = {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT || "https://cherry-apollo.glitch.me",
    PUBLIC_PATH: process.env.PUBLIC_PATH || "/static/",
    ...localPublicConfig,
};

export {};
