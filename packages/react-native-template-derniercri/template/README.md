# HelloWorld

## Installation

Since some packages used in this project are private, you should follow some steps :

1. In a command line, type

```shell script
npm login --registry=https://npm.pkg.github.com/ --scope=@derniercri
```

2. Add a `.npmrc` file to your project, that contains

   > @derniercri:registry=https://npm.pkg.github.com

3. Install the project

```shell script
yarn install
```

### Log globally

If you are a Dernier Cri developer, you will have to do this steps on each project.

But instead of using project's `.npmrc` file, you can edit your `~/.npmrc` and add/edit these lines :

```
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
@derniercri:registry=https://npm.pkg.github.com
```

This way, you won't have to do it again.
