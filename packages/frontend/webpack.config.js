const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { merge } = require("webpack-merge");

function common({ browserslistEnv, isProductionBuild }, isClient) {
    return {
        mode: isProductionBuild ? "production" : "development",
        devtool: isProductionBuild ? false : "eval-source-map",
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
        },
        output: {
            clean: isProductionBuild,
        },
        stats: "errors-only",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: path.resolve(__dirname, ".cache", "babel-loader"),
                                caller: { browserslistEnv, isClient, isProductionBuild },
                            },
                        },
                        {
                            loader: "@linaria/webpack-loader",
                            options: {
                                cacheDirectory: path.resolve(__dirname, ".cache", "linaria"),
                                sourceMap: !isProductionBuild,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                emit: isClient,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: !isProductionBuild,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(isProductionBuild ? "production" : "development"),
                SSR_MODE: JSON.stringify(!isClient),
            }),
            new MiniCssExtractPlugin({
                filename: isProductionBuild ? "[contenthash].css" : "[name].css",
            }),
            !isProductionBuild &&
                new webpack.SourceMapDevToolPlugin({
                    test: /\.css$/,
                }),
        ].filter(Boolean),
    };
}

function client({ browserslistEnv, isProductionBuild }) {
    return {
        name: "client",
        target: `browserslist:${browserslistEnv}`,
        entry: [
            !isProductionBuild ? "webpack-hot-middleware/client?reload=true&noInfo=true&name=client" : undefined,
            "./src/client",
        ].filter(Boolean),
        output: {
            filename: isProductionBuild ? "[contenthash].js" : "[name].js",
            path: path.resolve(__dirname, "dist", "client"),
        },
        plugins: [
            !isProductionBuild ? new webpack.HotModuleReplacementPlugin() : undefined,
            !isProductionBuild ? new ReactRefreshWebpackPlugin() : undefined,
            new LoadablePlugin({
                filename: "../server/loadable-stats.json",
            }),
        ].filter(Boolean),
        optimization: {
            moduleIds: "deterministic",
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        },
    };
}

function server({ browserslistEnv }) {
    return {
        name: "server",
        target: `browserslist:${browserslistEnv}`,
        entry: "./src/server",
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist", "server"),
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

module.exports = (env = {}) => {
    const isProductionBuild = env.production;
    const clientConfig = { browserslistEnv: "client", isProductionBuild };
    const serverConfig = { browserslistEnv: "server", isProductionBuild };

    // We don't rely on it, but set it anyway for tools which might depend on it.
    process.env.NODE_ENV = isProductionBuild ? "production" : "development";

    return [
        merge(common(clientConfig, true), client(clientConfig)),
        merge(common(serverConfig, false), server(serverConfig)),
    ];
};
