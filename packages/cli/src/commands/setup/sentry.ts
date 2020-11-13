import { Command, flags } from "@oclif/command";
import * as Listr from "listr";
import * as execa from "execa";
// @ts-ignore
import * as listrInquirer from "listr-inquirer";
import * as childProcess from "child_process";
import { readFileSync, writeFileSync } from "fs";

export default class SetupSentry extends Command {
  static description = "Setup Sentry (https://sentry.io/)";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    const tasks = new Listr([
      { title: "Install dependencies", task: () => execa("yarn", ["add", "@sentry/react-native"]) },
      {
        title: "Getting DSN informations",
        task: async (ctx) =>
          listrInquirer(
            [{ type: "input", message: "Please enter your Sentry DSN :", name: "dsn" }],
            (answers: any) => {
              ctx.dsn = answers.dsn;
            }
          ),
      },
      {
        title: "Run wizard",
        task: async (ctx, task) => {
          task.title = `Run wizard with DSN ${ctx.dsn}`;
          childProcess.execSync("npx @sentry/wizard -i reactNative -p ios android", {
            stdio: "inherit",
          });
        },
      },
      {
        title: "Insert into your code",
        task: (ctx) => {
          writeFileSync(
            "./modules/sentry.ts",
            `import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn:
    '${ctx.dsn}',
})
`
          );

          const AppTsxContent = readFileSync("./App.tsx");
          const nextAppTsxContent = `import './modules/sentry'
${AppTsxContent}`;

          writeFileSync("./App.tsx", nextAppTsxContent);
        },
      },
    ]);

    await tasks.run();
  }
}
