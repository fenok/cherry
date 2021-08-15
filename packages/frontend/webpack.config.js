const path = require("path");

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./src",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { cacheDirectory: path.resolve(__dirname, ".cache", "babel-loader") },
                },
            },
        ],
    },
};
