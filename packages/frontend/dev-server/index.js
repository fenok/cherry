const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const { ssrMiddleware } = require("./ssrMiddleware");
const getPort = require("get-port");
const open = require("open");
const yargs = require("yargs/yargs");

const params = yargs(process.argv).argv;

const compiler = webpack(require("../webpack.config")({ production: params.p }));

async function start() {
    const app = express();

    app.use(webpackDevMiddleware(compiler, { serverSideRender: true }));
    app.use(webpackHotMiddleware(compiler));
    app.use(ssrMiddleware);

    const port = await getPort({ port: getPort.makeRange(3000, 3100) });

    app.listen(port, async () => {
        console.log(`Cherry dev server is up at http://localhost:${port}`);

        if (params.o) {
            console.log("Opening browser tab...");
            await open(`http://localhost:${port}`);
        } else {
            console.log("Use -o option to automatically open a browser tab.");
        }

        if (params.p) {
            console.log("Warning: using production build.");
        } else {
            console.log("Use -p option to switch to production build.");
        }
    });
}

void start();
