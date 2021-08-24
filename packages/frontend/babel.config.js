module.exports = (api) => ({
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: require("core-js/package.json").version,
                browserslistEnv: api.caller((caller) => caller && caller.browserslistEnv),
                bugfixes: true,
            },
        ],
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic" }],
    ],
});
