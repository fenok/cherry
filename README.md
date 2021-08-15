# Cherry 🍒

React project boilerplate with step-by-step creation history.

## Tech stack

-   VCS: Git.
-   Supported operating systems: macOS, Windows, and Linux.
-   IDE: WebStorm.
-   Node package manager: Yarn 2 (even 3, actually).
-   Code Style: Prettier.
-   Local git hooks: Husky.
-   Commit message linting: commitlint.
-   Running scripts for staged files: lint-staged.
-   Bundler: Webpack.
-   Transpilation and polyfills: Babel, @babel/preset-env, core-js.

## History

### Git repository initialization

```
mkdir cherry
cd cherry
git init
git commit --allow-empty -m "Initial commit"
git checkout -b dev
```

We create a new directory and turn it into a git repository with an empty initial commit. We also create a new branch `dev` and switch to it.

The empty initial commit allows us to set up branches before we even do anything. For now, we have the `main` branch and the `dev` branch.

The `main` branch is our latest release. We haven't released anything yet, so it points to the empty commit (and will continue to do so for some time).

The `dev` branch is where we will implement features before releasing them.

This branching model resembles [git-flow](https://nvie.com/posts/a-successful-git-branching-model/). We don't use [GitHub flow](https://guides.github.com/introduction/flow/), because we want to be able to implement multiple features before releasing them all at once.

As a bonus, the empty initial commit will save us some headache in case of [rebasing](https://stackoverflow.com/questions/22992543/how-do-i-git-rebase-the-first-commit).

### .gitignore initialization

Now is a good time to create the `.gitignore` file. We don't have any code yet, but we can already ignore the OS-specific files. The easiest way to do so is to use [gitignore.io](https://gitignore.io). We want the project to work on macOS, Windows, and Linux.

### IDE initialization

The next logical step is to set up the IDE. We will use [WebStorm](https://www.jetbrains.com/webstorm/) (2021.2 at the time of writing).

For now, we will rely on the automatically created `.idea/.gitignore`, and we will consult [the official support page](https://intellij-support.jetbrains.com/hc/en-us/articles/206544839-How-to-manage-projects-under-Version-Control-Systems) before adding any IDE files to VCS.

### Package manager initialization

We will use Yarn 2 (oh wait, it's already Yarn 3) as a package manager, because we want its [Plug'n'Play](https://yarnpkg.com/features/pnp) and [Zero-Installs](https://yarnpkg.com/features/zero-installs) features.

We need to install Node first. The easiest way is to use `nvm` for [macOS/Linux](https://github.com/nvm-sh/nvm) or [Windows](https://github.com/coreybutler/nvm-windows). We will use Node 14.17.5 (the latest LTS at the time of writing).

Now we can [install Yarn 2](https://yarnpkg.com/getting-started/install):

> On Windows, use cmd.exe instead of powershell.exe, or you might get an error like [this](https://stackoverflow.com/questions/57673913/vsc-powershell-after-npm-updating-packages-ps1-cannot-be-loaded-because-runnin). In WebStorm, you can configure the terminal executable: **File | Settings | Tools | Terminal | Shell path**.

```
npm install -g yarn
yarn set version berry
yarn set version latest
```

We also need to [update `.gitignore`](https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored) (we're using Zero-Installs).

Note that we could use [gitignore.io](https://gitignore.io) to update `.gitignore` for both Node and Yarn, but the generated Node part is extremely bloated, and the Yarn part will likely require some manual tuning, so it's better to configure them manually.

We also need to tell WebStorm to use Yarn as the package manager at **File | Settings | Languages & Frameworks | Node.js and NPM**.

### Node package initialization

We want this project to be a monorepo, because we will likely want to put backend and frontend packages here.

Let's init this package as a workspace root:

```
yarn init -w
```

We also add the [`description`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#description-1), [`repository`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#repository), [`license`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#license), and [`author`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#people-fields-author-contributors) fields, because they seem important even for a private package.

We use the [MIT](https://opensource.org/licenses/MIT) license, because it's the default option for open-source software. We also add the `LICENSE` file.

### Adding prettier

We add [`prettier`](https://prettier.io/) as a dev dependency:

```
yarn add -D prettier
```

Then we add `format` yarn script:

```
"scripts": {
    "format": "prettier --write --ignore-unknown ."
},
```

The `--write` option enables formatting in-place, and `--ignore-unknown` in conjunction with the `.` pattern means that
we will format _any_ file wich `prettier` is capable to format.

Now we just need to ignore the files that we don't want to be formatted, so we create the `.prettierignore` file:

```
.idea/
.yarn/
.pnp.*
.yarnrc.yml
packages/
```

We don't want to touch the IDE files (`.idea/`), yarn files (`.yarn/`, `.pnp.*`, `.yarnrc.yml`), and packages (because
they will have their own formatting scripts).

We also tweak `prettier` via the `.prettierrc` file.

```
{
    "tabWidth": 4,
    "printWidth": 120
}
```

And we delete the `.editorconfig` file, because `prettier` completely overrides it.

> There is a [bug](https://youtrack.jetbrains.com/issue/WEB-51899) in WebStorm 2021.2 that prevents running `prettier` on save, so we roll back to the previous WebStorm version.

We also need to configure WebStorm. At **File | Settings | Languages & Frameworks | Javascript | Prettier**, we enable the "On save" option and specify the following glob pattern: `{**/*,*}.*`.

We also use the `prettier` code style (enabled via the popup at the `.prettierrc` file).

### Adding Husky

We want to use local git hooks, so we [install Husky](https://typicode.github.io/husky/#/?id=yarn-2). Note that we're not going to publish any packages, so we don't need the `pinst` hack.

```
yarn add husky --dev
yarn husky install
```

We also add a `postinstall` script to automatically enable git hooks after install:

```json
{
    "scripts": {
        "postinstall": "husky install"
    }
}
```

And, just to be safe, we add the `.husky` directory to `.prettierignore`.

### Linting commit message

We want to enforce commit messages consistency, so we install [commitlint](https://commitlint.js.org/#/):

```
yarn add -D @commitlint/cli
```

Then we create the configuration file (`commitlint.config.js`). We won't use [Conventional Commits](https://www.conventionalcommits.org/), because it's an overkill for the project. Instead, we will use simple and permissive format, which is described [here](https://chris.beams.io/posts/git-commit).

> By the way, we enabled Coding assistance for Node.js in WebStorm (**File | Settings | Languages & Frameworks | Node.js and NPM**)

```javascript
module.exports = {
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
```

Finally, we need to add the git hook:

```bash
yarn husky add .husky/commit-msg "yarn commitlint --edit $1"
```

### Formatting files before commit

We want to ensure that files are formatted before commit. The easiest way to achieve this is to use [lint-staged](https://github.com/okonet/lint-staged):

```
yarn add -D lint-staged
```

We configure lint-staged to [run prettier on any staged file](https://github.com/okonet/lint-staged#automatically-fix-code-style-with-prettier-for-any-format-prettier-supports) (`lint-staged.config.js`):

```
module.exports = {
    "*": "prettier --ignore-unknown --write"
}
```

Finally, we need to add the git hook:

```bash
yarn husky add .husky/pre-commit "yarn lint-staged"
```

### Creating frontend package

We initialize private `frontend` package, because we have no intentions to publish it. We also need to update the lockfile after that.

```bash
cd packages
mkdir frontend
cd frontend
yarn init -p
yarn install
```

We also add the [`description`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#description-1), [`repository`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#repository), [`license`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#license), and [`author`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#people-fields-author-contributors) fields (as in the root package).

### Enabling prettier for frontend package

We add Prettier to the `frontend` package.

```bash
yarn add -D prettier
```

We also create the `format` yarn script (it's the same as the root one).

Frontend Prettier will reuse the root config, and we don't have anything to ignore (yet).

We also need to teach the root package to run `format` in all workspaces. We will use [yarn workspaces foreach](https://yarnpkg.com/cli/workspaces/foreach) for that:

```bash
yarn plugin import workspace-tools
```

It seems more convenient to create a generic `foreach` script in the root package for running scripts in all workspaces in parallel:

```json
{
    "scripts": {
        "foreach": "yarn workspaces foreach -p run"
    }
}
```

Now we can run `format` in all workspaces (including the root one) like this:

```bash
yarn foreach format
```

### Formatting frontend files before commit

Right now `lint-staged` only works for the root package. Let's fix that.

We need to add `lint-staged` to `frontend`:

```bash
yarn add -D lint-staged
```

We also need to add `lint-staged.config.js` to `frontend`. For now, it's just a copy of the root config.

Then, we need to add the `pre-commit` script to every `package.json`:

```json
{
    "scripts": {
        "pre-commit": "lint-staged"
    }
}
```

Finally, we need to update the git hook:

```bash
yarn husky add .husky/pre-commit "yarn workspaces foreach -p run pre-commit"
```

This way, before commit, all `pre-commit` scripts will be called in parallel.

### Adding Webpack

We will use [Webpack](https://webpack.js.org/) as a bundler.

```bash
yarn add -D webpack webpack-cli
```

[By default](https://webpack.js.org/configuration/), Webpack expects the entry point to be `src/index.js`. Let's go ahead and create it:

```javascript
// src/index.js
console.log("Hello");
```

We also need to add the `build` script:

```json
{
    "scripts": {
        "build": "webpack"
    }
}
```

Let's try it:

```bash
yarn build
```

As expected, we got the `dist` directory. We need to add it to `.gitignore` and `.prettierignore` in `frontend`.

We also need to tell WebStorm to exclude it from indexing (**Right mouse click in Project tree | Mark Directory as | Excluded**), because we don't need to search in it. Otherwise, WebStorm will index it each time we build, which (for real-life projects) takes time and blocks other operations.

### Adding Babel

We will use Babel to transpile our code and add polyfills where necessary. Since we're using Webpack, we will utilize [babel-loader](https://webpack.js.org/loaders/babel-loader/):

```bash
yarn add -D babel-loader @babel/core @babel/preset-env core-js
```

> Note that core-js has a `postinstall` script which doesn't actually build anything, but forces Yarn to unplug the package. For now, we can implement a workaround on our part. We can explicitly prevent core-js from "building" by utilizing [`dependenciesMeta`](https://github.com/zloirock/core-js/issues/758#issuecomment-591829187). For some reason, we have to specify this field in the root `package.json`.

Let's add [webpack config](https://webpack.js.org/configuration/):

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./src",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { cacheDirectory: path.resolve(__dirname, ".cache", "babel-loader") },
                },
            },
        ],
    },
};
```

At this point, we want to read the output file, so we use the `development` mode without devtool.

We also process `.js` files with babel-loader. To speed things up, we ignore our dependencies (`exclude: /node_modules/`) and cache the loader output (the `cacheDirectory` option).

We create a separate `.cache` directory, because we don't have the `node_modules` directory, and we don't want to create files outside the project directory. Also, at least on Windows, babel-loader will create the `node_modules` directory anyway (if this option is set to `true`), which is definitely not what we want.

We add the `.cache` directory to `.gitignore` and `.prettierignore` in `frontend`. We also tell WebStorm to exclude it from indexing.

The rest of the Babel config goes to a separate file, because other tools may need it:

```javascript
// babel.config.js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: require("core-js/package.json").version,
                bugfixes: true,
            },
        ],
    ],
};
```

For now, we only use the [`preset-env`](https://babeljs.io/docs/en/babel-preset-env) preset to transpile code and add polyfills according to the target environments.

We set `useBuiltIns` to `"usage"` to add polyfills only for features that we're actually using. We also specify the `core-js` version (as recommended, we added `core-js` directly) by reading the version directly from the installed `core-js` package.

We also enable the `bugfixes` option to potentially reduce the bundle size with no cost.

Now we need to specify our target environments. Let's do this by creating the `.browserslistrc` file:

```
> 0.25%
not dead
```

For now, we simply stick to the example from the [docs](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration).
