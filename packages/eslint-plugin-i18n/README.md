# @derniercri/eslint-plugin-i18n

## Installation

```shell
yarn add -D @derniercri/eslint-plugin-i18n
```

or if you are using npm

```shell
npm i -D @derniercri/eslint-plugin-i18n
```

Enable it by inserting in your project

```json
{
  "plugins": ["@derniercri/i18n"]
}
```

## Available rules

### `@derniercri/i18n/no-child-string`

This rule will avoid you using text as children.
Useful when you want to enforce `i18n`.

Example :

```json
{
  "plugins": ["@derniercri/i18n"],
  "rules": {
    "@derniercri/i18n/no-child-string": ["error"]
  }
}
```
