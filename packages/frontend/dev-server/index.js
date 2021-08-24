const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const express = require("express");
const { ssrMiddleware } = require("./ssrMiddleware");

const compiler = webpack(require("../webpack.config")());

const app = express();

app.use(webpackDevMiddleware(compiler, { serverSideRender: true }));
app.use(ssrMiddleware);

app.listen(3000, () => console.log("Cherry dev server is up at localhost:3000"));
