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
-   Language: Typescript.
-   TS/JS linter: ESLint.
-   UI library: React.
-   Server-Side Rendering: ✅.
-   Hot Module Replacement: ✅ (React Fast Refresh).

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

### Adding Typescript

We will use Babel to transform code written in Typescript. While there are some [limitations](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats), it's just more convenient (the only real issue is lack of const enums).

> We also add `typescript` to the root package, because we need to tell Webstorm which `typescript` to use. It makes more sense to use the root `typescript`. `typescript` versions in all workspaces must be the same.

```bash
yarn add -D typescript @babel/preset-typescript
```

Let's start with root `typescript` config. We can use `yarn tsc --init` to generate a default config which we then can edit. Here's what we ended up with:

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitOverride": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true
    }
}
```

We enabled strict type checks (`strict`), forced overrides to be explicit (`noImplicitOverride`), simplified usage of CommonJS modules in ES6 modules (`esModuleInterop`), and forced casing in filenames to be consistent (`forceConsistentCasingInFileNames`). The latter is important, because we support Windows, which uses case-insensitive filenames by default.

Now let's create a `frontend`-specific config:

```json
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "target": "ESNEXT",
        "noEmit": true,
        "isolatedModules": true
    },
    "include": ["src"]
}
```

We extend the root config. We target `"ESNEXT"` to support all language features, because code transpilation and polyfills are handled by Babel. We don't emit anything, because Typescript will be used only for type-checking. We also enable `isolatedModules` to match Babel behavior (Babel can only process files independently).

We only include the `src` directory to our Typescript project.

Then we add `@babel/preset-typescript` to `babel.config.js`.

Now we need to apply `babel-loader` to `.ts` files by updating the corresponding regexp. We also need to tell Webpack that we use the `.ts` extension by adding it to the `resolve.extensions` array in `webpack.config.js`.

We also need to switch our `src/index.js` to `src/index.ts` and add some types for testing.

At this point we can test our build:

```bash
yarn build
```

Finally, we need to add actual type-checking.

Let's create a `lint` yarn script:

```json
{
    "scripts": {
        "lint": "tsc"
    }
}
```

We also need to [add type-checking to lint-staged](https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments) to check types before commit:

```javascript
module.exports = {
    "**/*.ts": () => "tsc",
};
```

We also need to make sure that Webstorm uses the root `typescript` package (**File | Settings | Languages & Frameworks | Typescript**).

### Adding ESLint

We'll use ESLint to lint both `.js` (most likely only configuration files) and `.ts` files.

Let's start by adding `eslint` to the root package. We will also use the [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin). We will disable the rules that conflict with Prettier by utilizing [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

```bash
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier
```

Then we need to create the root `.eslintrc.js`:

```javascript
module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: ["eslint:recommended", "prettier"],
    overrides: [
        {
            files: ["**/*.ts"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
            },
            plugins: ["@typescript-eslint"],
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "prettier",
            ],
        },
    ],
};
```

-   We mark this config as `root` to prevent potential merges with upper configs.

-   We specify that we're going to use ES6 and Node.js globals.

-   For `.js` files, we simply use the `eslint:recommended` set of rules.

-   We use the `overrides` option to specify config for `.ts` files. We follow the [guide for monorepo](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/MONOREPO.md) (for all recommended rules, including type checks).

-   We disable the rules that conflict with Prettier.

Then we need to add the root `.eslintignore` file:

```
.husky/
.yarn/
packages/
.pnp.*
```

Again, we ignore packages, because they will be linted by their respective scripts.

Then we need to add the root linting script:

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

Now let's add linting to the `frontend` package.

First, we need to add `eslint`:

```bash
yarn add -D eslint
```

We also need to create local `.eslintignore`:

```
.cache/
dist/
```

And we also need to edit the linting script:

```json
{
    "scripts": {
        "lint": "tsc && eslint ."
    }
}
```

To enable linting before commit, we need to add the following rule to all `lint-staged.config.js` files:

```javascript
module.exports = { "**/*.{js,ts}": "eslint" };
```

Finally, we need to tell Webstorm to use ESLint at **File | Settings | Language & Frameworks | Javascript | Code Quality Tools | ESLint** (Automatic ESLint configuration).

### Adding React

```bash
yarn add -D react @types/react react-dom @types/react-dom @babel/preset-react
```

We enable [the New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup).

We also make all our tools (namely, lint-staged, ESLint, Webpack and babel-loader, ) aware of `.tsx` files.

We change our `src/index.ts` to `src/index.tsx` to be able to use TSX. We will import stuff in our `src/index.tsx`, so we need to set the `moduleResolution` option to `"Node"` in our `tsconfig.json`. Since we won't ever use the default value, it's better to set it in the root config. We also need to tell Webpack that we're using `.js` files as well, because published packages usually consist of `.js` files.

We update the `src/index.tsx` contents to actually use React and `yarn build` it to ensure that everything works.

### Adding SSR

```bash
yarn add -D webpack-dev-middleware express @types/express webpack-merge require-from-string
```

#### Dev server

Now we want to see our code in action. Since we want SSR, there is no point in using webpack-dev-server and/or HtmlWebpackPlugin.

We will build our own dev-server with SSR support. We will use [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for that.

The server will be relatively simple, and it's an isolated thing, so it's easier to just write it in plain JS. We could use ts-node, but it feels like an overcomplication.

To enable SSR, we set the `serverSideRender` option to `true`. Now we can write our own `ssrMiddleware`, using the [guide](https://github.com/webpack/webpack-dev-middleware#server-side-rendering) from webpack-dev-middleware as an example.

Note how we expect Webpack to produce multiple builds. We take the (latest!) `server` build and `require` its `main` chunk with the help of `require-from-string` package. This way, we can always render the latest build on the server.

We expect the `main` chunk to export a `render` function, which returns a promise, because the render process can be asynchronous due to, e.g., data fetching. The promise resolves with everything we need to send a response.

> We need to set the `env.es2017` option to `true` in the root `.eslintrc.js` to be able to use async/await.

We consciously decouple the `render` function from the networking library. It's easier to use `express` in development, but we might want to use `fastify` in production, for example.

We also define the `start` yarn script, which just starts the dev server.

#### Webpack config

> We need to update Yarn because of this [issue](https://github.com/yarnpkg/berry/issues/3234).

We need to create two Webpack configs: one for the client, and the other one for the server. We split the existing config into common and target-specific parts, and we make them functions to be able to tweak them. We merge them via `webpack-merge` and return them as an array of two configurations.

Now we **do** need source maps, so we set the [`devtool`](https://webpack.js.org/configuration/devtool/#devtool) option to `eval-source-map` (high quality source maps, recommended for development).

Since we have two environments, we need to specify two sets of targets in our `.browserslistrc`. We move our original targets to the `production` environment, because it's the [default](https://github.com/browserslist/browserslist#configuring-for-different-environments). We also specify the `ssr` environment with our Node version (14.17.5).

We pass the browserslist environment (`browserslistEnv`) to the Babel config via the `caller` option, and obtain it there via the [`caller` API](https://babeljs.io/docs/en/config-files#apicallercb). Note that we could use the [built-in option](https://github.com/babel/babel-loader#customize-config-based-on-webpack-target), but it's easier to just pass `browserslistEnv` directly.

We `name` our target-specific configs to differ them and make the CLI output more readable.

We specify config targets by [using browserslist](https://webpack.js.org/configuration/target/#browserslist).

We also have to specify the [`output.library.type`](https://webpack.js.org/configuration/output/#type-commonjs2) option for server config, because we will use the output file in Node.

### Adding React Fast Refresh (HMR)

```bash
yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh webpack-hot-middleware
```

First, we configure [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware#installation--usage). We enable additional [options](https://github.com/webpack-contrib/webpack-hot-middleware#config) to reload in case of an error and to remove informational logs (which are extremely noisy). We also specified `name`, because we are in multi-compiler mode (we return an array of Webpack configurations).

Then, we need to configure [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin/#usage).

Note that we configure HMR only on the client side.

We also updated `.browserslistrc` to explicitly define `client` and `server` environments. We also use `server` environment by default. This is because we want Babel to fall back to `server` environment if it's used outside of Webpack.
