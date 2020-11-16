import { Command, flags } from "@oclif/command";
import Listr from "listr";
import * as fs from "fs";
import execa from "execa";
// @ts-ignore
import listrInquirer from "listr-inquirer";

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
          asJson.overrides = asJson.overrides || [];

          const lineIndex = asJson.overrides.findIndex(
            (ov: any) =>
              JSON.stringify(ov.files) === JSON.stringify(["*.test.tsx", "*.stories.tsx"])
          );

          if (lineIndex > -1) {
            asJson.overrides[lineIndex].rules["@derniercri/i18n/no-child-string"] = "off";
          } else {
            asJson.overrides.push({
              files: ["*.test.tsx", "*.stories.tsx"],
              rules: {
                "@derniercri/i18n/no-child-string": "off",
              },
            });
          }

          ctx.path = path;
          ctx.data = JSON.stringify(asJson, null, 2);
        },
      },
      {
        title: "Install ESLint plugin",
        skip: () => {
          const packageJson = fs.readFileSync("./package.json", "utf-8");
          const packageJsonJson = JSON.parse(packageJson);

          return Object.keys(packageJsonJson.devDependencies || {}).includes(
            "@derniercri/eslint-config-react-native"
          );
        },
        task: () => execa.command("yarn add -D @derniercri/eslint-config-react-native"),
      },
      {
        title: "Install i18n package",
        skip: () => {
          const packageJson = fs.readFileSync("./package.json", "utf-8");
          const packageJsonJson = JSON.parse(packageJson);

          return Object.keys(packageJsonJson.devDependencies || {}).includes(
            "@derniercri/react-native-i18n"
          );
        },
        task: () => execa.command("yarn add @derniercri/react-native-i18n react-native-localize"),
      },
      {
        title: "Configure ESLint plugin",
        task: (ctx) => {
          fs.writeFileSync(ctx.path, ctx.data);
        },
      },
      {
        title: "Create files",
        task: (ctx, task) =>
          listrInquirer(
            [
              {
                type: "confirm",
                name: "create",
                message: "Do you want to create necessary files?",
              },
            ],
            function (answers: any) {
              if (answers.create === false) {
                task.skip("Skipped");
              } else {
                fs.mkdirSync("./src/i18n");
                fs.mkdirSync("./src/i18n/dictionaries");
                fs.writeFileSync(
                  "./src/i18n/dictionaries/en.json",
                  JSON.stringify({ hello: "world" }, null, 2)
                );
                fs.writeFileSync(
                  "./src/i18n/dictionaries/fr.json",
                  JSON.stringify({ hello: "world" }, null, 2)
                );

                fs.writeFileSync(
                  "./src/i18n/index.ts",
                  `import I18n from "@derniercri/react-native-i18n";

import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";

const dictionaries = { en, fr } as const;

const i18n = new I18n<typeof dictionaries>();

i18n.configure({ dictionaries });

export default i18n;
`
                );
              }
            }
          ),
      },
    ]);

    tasks.run().catch((error) => {
      const oclifHandler = require("@oclif/errors/handle");
      // do any extra work with error
      return oclifHandler(error);
    });
  }
}
