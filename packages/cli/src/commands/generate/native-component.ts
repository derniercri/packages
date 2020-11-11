import { Command, flags } from "@oclif/command";
import * as inquirer from "inquirer";
import * as fs from "fs";
import { toCamelCase, toKebabCase } from "../../utils/string";
import {
  generateComponentFile,
  generateIndexFile,
  generateStoryFile,
  generateTestFile,
} from "../../utils/generator";

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

export default class NativeComponent extends Command {
  static description = "Generate a React Native component in desired folder";

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
    // flag with a value (-n, --name=my-component)
    name: flags.string({ char: "n", description: "Component name" }),
    path: flags.string({ char: "p", description: "Your component's path" }),
  };

  static args = [
    { name: "name", description: "Component name" },
    { name: "path", description: "Your component's path" },
  ];

  async run() {
    const { args, flags } = this.parse(NativeComponent);

    let name;
    let path;

    if (args.name) name = args.name;
    else if (flags.name) name = flags.name;

    if (args.path) path = args.path;
    else if (flags.path) path = flags.path;

    if (!name) {
      const responses = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the component name ?",
        },
      ]);

      name = responses.name;
    }

    if (!path) {
      const pathResponses = await inquirer.prompt([
        {
          type: "fuzzypath",
          excludePath: (nodePath: string) => nodePath.startsWith("node_modules"),
          itemType: "directory",
          name: "destination",
          message: "Select a target directory",
          rootPath: "src",
          default: "src/components/",
        },
      ]);

      path = pathResponses.destination;
    }

    const finalComponentName = toCamelCase(toKebabCase(name));
    const folderName = toKebabCase(finalComponentName);
    const fullDestination = `./${path}/${folderName}`;

    if (!fs.existsSync(fullDestination)) {
      fs.mkdirSync(fullDestination);
    }

    fs.writeFileSync(`${fullDestination}/index.ts`, generateIndexFile(folderName));
    fs.writeFileSync(
      `${fullDestination}/${folderName}.tsx`,
      generateComponentFile(finalComponentName)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.test.tsx`,
      generateTestFile(finalComponentName, folderName)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.stories.tsx`,
      generateStoryFile(finalComponentName)
    );

    this.log(`Component name is ${name} and will be stored in ${path}`);
  }
}
