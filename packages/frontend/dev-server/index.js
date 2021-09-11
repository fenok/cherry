const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const { ssrMiddleware } = require("./ssrMiddleware");
const getPort = require("get-port");

const compiler = webpack(require("../webpack.config")());

async function start() {
    const app = express();

    app.use(webpackDevMiddleware(compiler, { serverSideRender: true }));
    app.use(webpackHotMiddleware(compiler));
    app.use(ssrMiddleware);

    const port = await getPort({ port: getPort.makeRange(3000, 3100) });

    app.listen(port, () => console.log(`Cherry dev server is up at localhost:${port}`));
}

void start();
