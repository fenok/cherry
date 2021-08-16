module.exports = {
    "*": "prettier --ignore-unknown --write",
    "**/*.ts": () => "tsc",
    "**/*.{js,ts}": "eslint",
};
