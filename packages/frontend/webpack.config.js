const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { merge } = require("webpack-merge");

function common({ browserslistEnv }, isClient) {
    return {
        mode: "development",
        devtool: "eval-source-map",
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
        },
        output: {
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: path.resolve(__dirname, ".cache", "babel-loader"),
                            caller: { browserslistEnv, isClient },
                        },
                    },
                },
            ],
        },
    };
}

function client({ browserslistEnv }) {
    return {
        name: "client",
        target: `browserslist:${browserslistEnv}`,
        entry: ["webpack-hot-middleware/client?reload=true&noInfo=true&name=client", "./src/client"],
        output: {
            path: path.resolve(__dirname, "dist", "client"),
            filename: "main.js",
        },
        plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin(), new LoadablePlugin()],
    };
}

function server({ browserslistEnv }) {
    return {
        name: "server",
        target: `browserslist:${browserslistEnv}`,
        entry: "./src/server",
        output: {
            path: path.resolve(__dirname, "dist", "server"),
            filename: "main.js",
            library: {
                type: "commonjs2",
            },
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
    };
}

module.exports = () => {
    const clientConfig = { browserslistEnv: "client" };
    const serverConfig = { browserslistEnv: "server" };

    return [
        merge(common(clientConfig, true), client(clientConfig)),
        merge(common(serverConfig, false), server(serverConfig)),
    ];
};
