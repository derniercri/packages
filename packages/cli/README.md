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
@derniercri/cli/4.3.0-alpha.0 darwin-x64 node-v14.8.0
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
* [`derniercri setup:fastlane`](#derniercri-setupfastlane)
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

_See code: [src/commands/generate/native-component.ts](https://github.com/derniercri/packages/blob/v4.3.0-alpha.0/src/commands/generate/native-component.ts)_

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

## `derniercri setup:fastlane`

Initialize fastlane

```
USAGE
  $ derniercri setup:fastlane

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/fastlane.ts](https://github.com/derniercri/packages/blob/v4.3.0-alpha.0/src/commands/setup/fastlane.ts)_

## `derniercri setup:sentry`

Setup Sentry (https://sentry.io/)

```
USAGE
  $ derniercri setup:sentry

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/sentry.ts](https://github.com/derniercri/packages/blob/v4.3.0-alpha.0/src/commands/setup/sentry.ts)_

## `derniercri setup:splash`

Setup react-native-splash-screen

```
USAGE
  $ derniercri setup:splash

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/setup/splash.ts](https://github.com/derniercri/packages/blob/v4.3.0-alpha.0/src/commands/setup/splash.ts)_
<!-- commandsstop -->
