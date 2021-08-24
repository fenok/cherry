const path = require("path");
const requireFromString = require("require-from-string");

async function ssrMiddleware(req, res) {
    const render = getRenderFn(res);
    const { statusCode, headers, body } = await render();

    res.status(statusCode).header(headers).send(body);
}

function getRenderFn(res) {
    const { devMiddleware } = res.locals.webpack;
    const outputFileSystem = devMiddleware.outputFileSystem;
    const jsonWebpackStats = devMiddleware.stats.toJson();
    const { assetsByChunkName, outputPath } = jsonWebpackStats.children.find((child) => child.name === "server");

    const rendererFileName = normalizeAssets(assetsByChunkName.main).find((asset) => asset.endsWith(".js"));

    return requireFromString(
        outputFileSystem.readFileSync(path.join(outputPath, rendererFileName), "utf-8"),
        rendererFileName
    ).render;
}

function normalizeAssets(assets) {
    if (assets && typeof assets === "object") {
        return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
}

module.exports = {
    ssrMiddleware,
};
