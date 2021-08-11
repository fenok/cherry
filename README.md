# Cherry 🍒

React project boilerplate with step-by-step creation history.

## Tech stack

-   VCS: Git.
-   Supported operating systems: macOS, Windows, and Linux.

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