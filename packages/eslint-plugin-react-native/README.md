# @derniercri/eslint-plugin-react-native

## Installation

```shell
yarn add -D @derniercri/eslint-plugin-react-native
```

or if you are using npm

```shell
npm i -D @derniercri/eslint-plugin-react-native
```

Enable it by inserting in your project

```json
{
  "plugins": ["@derniercri/react-native"]
}
```

## Available rules

### `@derniercri/react-native/no-child-string`

This rule will avoid you using text as children.
Useful when you want to enforce `i18n`.

Example :

```json
{
  "plugins": ["@derniercri/react-native"],
  "rules": {
    "@derniercri/react-native/no-child-string": ["error"]
  }
}
```
