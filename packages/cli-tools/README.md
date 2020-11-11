> ⚠️ **This package is now deprecated in favor of [`@derniercri/cli`](https://github.com/derniercri/packages/tree/master/packages/cli)** <br>
It will be removed in a future release

# @derniercri/cli-tools

##### Liens directs

- [Installation](#Installation)
- [Usage](#usage)
  - [`generate-react-component`](#generate-react-component)
  - [`generate-native-component`](#generate-native-component)
  - [`generate-component`](#generate-component)

## Installation

```shell
yarn add -D @derniercri/cli-tools
```

or if you are using npm

```shell
npm i -D @derniercri/cli-tools
```

## Usage

After installing it, it grants you 3 commands

### `generate-react-component`

This command will generate a React component based on your request.

```bash
> yarn generate-react-component

? What is the component name ? test-react
? Select a target directory src/components/
✨  Done in 4.24s.
```

The output will be

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 test-react
 ┃ ┃ ┣ 📜 index.ts
 ┃ ┃ ┣ 📜 test-react.modules.scss
 ┃ ┃ ┣ 📜 test-react.stories.tsx
 ┃ ┃ ┣ 📜 test-react.test.tsx
 ┃ ┃ ┗ 📜 test-react.tsx
 ┗ ...
```

### `generate-native-component`

This command will generate a React-Native component based on your request.

```bash
> yarn generate-native-component

? What is the component name ? test-native
? Select a target directory src/components/
✨  Done in 3.15s.
```

The result will be

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 test-native
 ┃ ┃ ┣ 📜 index.ts
 ┃ ┃ ┣ 📜 test-native.stories.tsx
 ┃ ┃ ┣ 📜 test-native.test.tsx
 ┃ ┃ ┗ 📜 test-native.tsx
 ┗ ...
```

### `generate-component`

This command will prompt you with an app type choice, then execute above command accordingly.

```bash
yarn generate-component

? What is your app type ? (Use arrow keys)
❯ React
  React-Native

? What is the component name ? test-component
? Select a target directory src/components/
✨  Done in 32.19s.
```

The output will be

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 test-component
 ┃ ┃ ┣ 📜 index.ts
 ┃ ┃ ┣ 📜 test-component.module.scss
 ┃ ┃ ┣ 📜 test-component.stories.tsx
 ┃ ┃ ┣ 📜 test-component.test.tsx
 ┃ ┃ ┗ 📜 test-component.tsx
 ┗ ...
```
