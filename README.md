# Cherry 🍒

React project boilerplate with step-by-step creation history.

## Tech stack

-   VCS: Git.
-   Supported operating systems: macOS, Windows, and Linux.
-   IDE: WebStorm.
-   Node package manager: Yarn 2 (even 3, actually).
-   Code Style: Prettier.
-   Local git hooks: Husky.

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