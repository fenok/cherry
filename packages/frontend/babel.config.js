module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: require("core-js/package.json").version,
                bugfixes: true,
            },
        ],
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic" }],
    ],
};
