# @derniercri/cli

Some CLI to help your development process

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@derniercri/cli.svg)](https://npmjs.org/package/@derniercri/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@derniercri/cli.svg)](https://npmjs.org/package/@derniercri/cli)
[![License](https://img.shields.io/npm/l/@derniercri/cli.svg)](https://github.com/derniercri/packages/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @derniercri/cli
$ derniercri COMMAND
running command...
$ derniercri (-v|--version|version)
@derniercri/cli/0.0.0 darwin-x64 node-v14.8.0
$ derniercri --help [COMMAND]
USAGE
  $ derniercri COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`derniercri generate-native-component [FILE]`](#derniercri-generate-native-component-file)
- [`derniercri help [COMMAND]`](#derniercri-help-command)

## `derniercri generate-native-component [FILE]`

describe the command here

```
USAGE
  $ derniercri generate-native-component [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/generate-native-component.ts](https://github.com/derniercri/packages/blob/v0.0.0/src/commands/generate-native-component.ts)_

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

<!-- commandsstop -->
