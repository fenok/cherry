module.exports = (api) => {
    const browserslistEnv = api.caller((caller = {}) => caller.browserslistEnv);
    const isClient = api.caller((caller = {}) => caller.isClient);
    const isProductionBuild = api.caller((caller = {}) => caller.isProductionBuild);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: require("core-js/package.json").version,
                    browserslistEnv,
                    bugfixes: true,
                },
            ],
            "@babel/preset-typescript",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@linaria",
        ],
        plugins: [
            isClient && !isProductionBuild && "react-refresh/babel",
            "@loadable/babel-plugin",
            "graphql-tag",
        ].filter(Boolean),
    };
};
