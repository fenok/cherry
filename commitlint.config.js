module.exports = {
    /** @see https://chris.beams.io/posts/git-commit */
    rules: {
        "header-case": [2, "always", "sentence-case"],
        "header-full-stop": [2, "never", "."],
        "header-max-length": [2, "always", 72],
        "header-min-length": [2, "always", 1],
        "body-full-stop": [2, "always", "."],
        "body-leading-blank": [2, "always"],
        "body-max-line-length": [2, "always", 72],
        "body-case": [2, "always", "sentence-case"],
    },
};
