# @derniercri/cli

Some CLI to help your development process

<!-- toc -->
* [@derniercri/cli](#derniercricli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @derniercri/cli
$ derniercri COMMAND
running command...
$ derniercri (-v|--version|version)
@derniercri/cli/4.3.0 darwin-x64 node-v14.8.0
$ derniercri --help [COMMAND]
USAGE
  $ derniercri COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`derniercri generate:native-component [NAME] [PATH]`](#derniercri-generatenative-component-name-path)
* [`derniercri help [COMMAND]`](#derniercri-help-command)
* [`derniercri i18n:check`](#derniercri-i18ncheck)
* [`derniercri i18n:generate-missing`](#derniercri-i18ngenerate-missing)
* [`derniercri setup:fastlane`](#derniercri-setupfastlane)
* [`derniercri setup:i18n`](#derniercri-setupi18n)
* [`derniercri setup:sentry`](#derniercri-setupsentry)
* [`derniercri setup:splash`](#derniercri-setupsplash)

## `derniercri generate:native-component [NAME] [PATH]`

Generate a React Native component in desired folder

```
USAGE
  $ derniercri generate:native-component [NAME] [PATH]

ARGUMENTS
  NAME  Component name
  PATH  Your component's path

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  Component name
  -p, --path=path  Your component's path

EXAMPLES
  # By passing arguments
     $ derniercri generate:native-component button src/components

  # By passing flags
     $ derniercri generate:native-component --name=button --path=src/components

  # By following wizard
     $ derniercri generate:native-component

     ? What is the component name ? button
     ? Select a target directory src/components/
     ✨  Done in 4.24s.

  It finally creates a folder like this
  📦 src
    ┣ 📂 components
    ┃ ┣ 📂 button
    ┃ ┃ ┣ 📜 index.ts
    ┃ ┃ ┣ 📜 button.stories.tsx
    ┃ ┃ ┣ 📜 button.test.tsx
    ┃ ┃ ┗ 📜 button.tsx
    ┗ ...
```

_See code: [src/commands/generate/native-component.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/generate/native-component.ts)_

## `derniercri help [COMMAND]`

display help for derniercri

```
USAGE
  $ derniercri help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `derniercri i18n:check`

Checks your code for missing translations

```
USAGE
  $ derniercri i18n:check

OPTIONS
  -d, --dictionaries=dictionaries  (required) Your dictionaries root path
  -h, --help                       Show this help
  --src=src                        [default: ./src] Your source path

EXAMPLE
  $ derniercri i18n:check -d ./src/i18n/dictionaries
```

_See code: [src/commands/i18n/check.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/i18n/check.ts)_

## `derniercri i18n:generate-missing`

Generates missing translations in your code

```
USAGE
  $ derniercri i18n:generate-missing

OPTIONS
  -d, --dictionaries=dictionaries  (required) Your dictionaries root path
  -h, --help                       show CLI help
  --src=src                        [default: ./src] Your source path

EXAMPLE
  $ derniercri i18n:generate-missing -d ./src/i18n/dictionaries
```

_See code: [src/commands/i18n/generate-missing.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/i18n/generate-missing.ts)_

## `derniercri setup:fastlane`

Initialize fastlane

```
USAGE
  $ derniercri setup:fastlane

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/fastlane.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/setup/fastlane.ts)_

## `derniercri setup:i18n`

Initialize i18n

```
USAGE
  $ derniercri setup:i18n

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/i18n.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/setup/i18n.ts)_

## `derniercri setup:sentry`

Setup Sentry (https://sentry.io/)

```
USAGE
  $ derniercri setup:sentry

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/sentry.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/setup/sentry.ts)_

## `derniercri setup:splash`

Setup react-native-splash-screen

```
USAGE
  $ derniercri setup:splash

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/splash.ts](https://github.com/derniercri/packages/blob/v4.3.0/src/commands/setup/splash.ts)_
<!-- commandsstop -->
