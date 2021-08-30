module.exports = {
    "*": "prettier --ignore-unknown --write",
    "**/*.{ts,tsx}": () => "tsc",
    "**/*.{js,ts,tsx}": "eslint",
    "src/**/*.{ts,tsx}": "stylelint",
};
