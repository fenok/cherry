module.exports = {
    "*": "prettier --ignore-unknown --write",
    "**/*.ts": () => "tsc",
};
