import { Command, flags } from "@oclif/command";
import Listr from "listr";
import * as fs from "fs";
import execa from "execa";

export default class SetupI18N extends Command {
  static description = "Initialize i18n";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    const tasks = new Listr([
      {
        title: "Check for compatibility",
        task: (ctx) => {
          const ESLINT_FILES = [
            ".eslintrc",
            ".eslintrc.json",
            ".eslintrc.js",
            ".eslintrc.yml",
            ".eslintrc.yaml",
          ];

          const WHITELIST = [".eslintrc"];

          let path = ".eslintrc";
          let currentEslintRc = "{}";

          ESLINT_FILES.forEach((eslintPath) => {
            if (fs.existsSync(`./${eslintPath}`)) {
              path = eslintPath;
              currentEslintRc = fs.readFileSync(`./${eslintPath}`, { encoding: "utf-8" });
              return;
            }
          });

          if (!WHITELIST.includes(path)) {
            this.error(
              `We cannot work with \`${path}\` file type yet. Try again with a \`.eslintrc\` file instead.`
            );
          }

          const asJson = JSON.parse(currentEslintRc);

          asJson.extends = [...new Set([...(asJson.extends || []), "@derniercri/react-native"])];
          asJson.rules = {
            ...(asJson.rules || {}),
            "@derniercri/i18n/no-child-string": ["error"],
          };

          ctx.path = path;
          ctx.data = JSON.stringify(asJson, null, 2);
        },
      },
      {
        title: "Install dependencies",
        skip: () => true,
        task: () => execa.command("yarn add -D @derniercri/eslint-config-react-native"),
      },
      {
        title: "Configure plugin",
        task: (ctx) => {
          fs.writeFileSync(ctx.path, ctx.data);
        },
      },
    ]);

    tasks.run().catch((error) => {
      const oclifHandler = require("@oclif/errors/handle");
      // do any extra work with error
      return oclifHandler(error);
    });
  }
}
