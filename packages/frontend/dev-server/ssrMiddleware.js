const path = require("path");
const requireFromString = require("require-from-string");

async function ssrMiddleware(req, res) {
    const render = getRenderFn(res);
    const { statusCode, headers, body } = await render({ stats: getLoadableStats(res) });

    res.status(statusCode).header(headers).send(body);
}

function getLoadableStats(res) {
    const { outputPath } = getStatsByName(res, "server");
    const outputFileSystem = res.locals.webpack.devMiddleware.outputFileSystem;

    return JSON.parse(outputFileSystem.readFileSync(path.join(outputPath, "loadable-stats.json"), "utf-8"));
}

function getRenderFn(res) {
    const { assetsByChunkName, outputPath } = getStatsByName(res, "server");
    const outputFileSystem = res.locals.webpack.devMiddleware.outputFileSystem;

    const rendererFileName = normalizeAssets(assetsByChunkName.main).find((asset) => asset.endsWith(".js"));

    return requireFromString(
        outputFileSystem.readFileSync(path.join(outputPath, rendererFileName), "utf-8"),
        rendererFileName
    ).render;
}

function getStatsByName(res, name) {
    const stats = getAllStats(res);

    return stats.children.find((child) => child.name === name);
}

function getAllStats(res) {
    return res.locals.webpack.devMiddleware.stats.toJson();
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
