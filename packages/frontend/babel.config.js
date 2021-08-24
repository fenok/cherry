module.exports = (api) => {
    const browserslistEnv = api.caller((caller = {}) => caller.browserslistEnv);
    const isClient = api.caller((caller = {}) => caller.isClient);

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
        ],
        plugins: [isClient ? "react-refresh/babel" : undefined, "@loadable/babel-plugin"].filter(Boolean),
    };
};
