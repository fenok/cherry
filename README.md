# Cherry 🍒

React project boilerplate with step-by-step creation history.

## Tech stack

-   VCS: Git.
-   Supported operating systems: macOS, Windows, and Linux.
-   IDE: WebStorm.
-   Node package manager: Yarn 2 (even 3, actually).

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