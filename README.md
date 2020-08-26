# Dernier Cri packages

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Installation

To be able to install any of the packages here, you have to follow a few more steps.

1. In a command line, type

```shell script
npm login --registry=https://npm.pkg.github.com/ --scope=@derniercri
```

2. Add a `.npmrc` file to your project, that contains

   > @derniercri:registry=https://npm.pkg.github.com

3. Install the desired package

```shell script
yarn add @derniercri/YOUR_PACKAGE
```

### If you love DernierCri packages

Instead of using project `.npmrc` file, you can edit your personal `.npmrc` at `~/.npmrc` and add/edit these lines :

```
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
@derniercri:registry=https://npm.pkg.github.com
```

## Release a new version

If you want to release a new version, just run

```bash
yarn release
```

It will prompt you with several questions and at the end, it will push a new version to Github.
