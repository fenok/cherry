const path = require("path");
const { merge } = require("webpack-merge");

function common({ browserslistEnv }) {
    return {
        mode: "development",
        devtool: "eval-source-map",
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
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
                            caller: { browserslistEnv },
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
        entry: "./src/client",
        output: {
            path: path.resolve(__dirname, "dist", "client"),
            filename: "main.js",
        },
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
    };
}

module.exports = () => {
    const clientConfig = { browserslistEnv: "production" };
    const serverConfig = { browserslistEnv: "ssr" };

    return [merge(common(clientConfig), client(clientConfig)), merge(common(serverConfig), server(serverConfig))];
};
