# @derniercri/react-native-i18n

```json5
// src/i18n/dictionaries/en.json

{
  "hello-world": "Hello, World!",
}
```

```json5
// src/i18n/dictionaries/fr.json

{
  "hello-world": "Salut à tous !",
}
```

```ts
// src/i18n/index.ts

import I18n from "@derniercri/react-native-i18n";

import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";

const dictionaries = { en, fr } as const;

const i18n = new I18n<typeof dictionaries>();

i18n.configure({ dictionaries });

export default i18n;
```

```tsx
// src/App.tsx

import React from "react";
import { Text, View } from "react-native";

import i18n from "./i18n";

const App = () => (
  <View style={{ marginTop: 96 }}>
    <Text>{i18n.t("hello-world")}</Text>
  </View>
);

export default App;
```

- [@derniercri/react-native-i18n](#derniercrireact-native-i18n)
- [Usage](#usage)
- [Commands](#commands)

## Installation

Install it with

```shell script
$ yarn add @derniercri/react-native-i18n react-native-localize
```

## Configuration

You must configure this package to be able to use it.

Create a file :

```typescript
import I18n from "@derniercri/react-native-i18n";

import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";

const dictionaries = { en, fr } as const;

const i18n = new I18n<typeof dictionaries>();

i18n.configure({ dictionaries });

export default i18n;
```

## Configuration options

You can pass some options to `i18n.configure` :

| Option       | Description                                                                                                                                   | Required | Default                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| dictionaries | The dictionaries where your localizations are stored. Object key is the language code (en, fr, de) and the value is an object of translations | true     |                         |
| locale       | The default locale. By default, we will search for the user preferred language.                                                               | false    | User preferred language |

## Usage

Now you can import your i18n and get your translation with

```typescript
import i18n from "./i18n";

const myTranslatedKey = i18n.t("hello-world"); // Hello, World!
```

## Variables

You can use variables in your translations like this :

```json
{
  "greetings": "Hi {{name}}"
}
```

And in your JavaScript :
```tsx
const myTranslatedKey = i18n.t('greetings', { name: "John Doe" })
```

You will get `Hi John Doe`

## API

| Method                                                                               | Description                                        |
|--------------------------------------------------------------------------------------|----------------------------------------------------|
| configure(options: { dictionaries: T, locale: keyof T }) => void                     | Configuration method                               |
| t(path: keyof T[keyof T] \| string, variables?: { [key: string]: string }) => string | The method you will call to translate your strings |
