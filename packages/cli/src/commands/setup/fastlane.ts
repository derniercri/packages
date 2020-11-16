import { Command, flags } from "@oclif/command";
import inquirer from "inquirer";
import execa from "execa";
import Listr from "listr";
import { touchGemfile } from "../../utils/fastlane";

export default class SetupFastlane extends Command {
  static description = "Initialize fastlane";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        default: true,
        message: "This is a work-in-progress, are you sure?",
        name: "confirm",
      },
    ]);

    if (answers.confirm) {
      const tasks = new Listr([
        {
          title: "Install Fastlane",
          task: () => {
            return new Listr([
              {
                title: "Create Gemfile",
                task: () => {
                  touchGemfile();
                },
              },
              {
                title: "Install Gemfile",
                task: () => execa("bundle", ["install"]),
              },
            ]);
          },
        },
        {
          title: "Initialize Fastlane",
          task: () => {
            execa("echo", [
              `
⚠️  Manual updates are required !
You can now run \`bundle exec fastlane init\` to set it up.
You can find fastlane documentation here https://docs.fastlane.tools/
`,
            ]).stdout?.pipe(process.stdout);
          },
        },
      ]);

      tasks.run().catch((err) => {
        console.error(err);
        process.exit(1);
      });
    } else {
      console.log("Run this command again if you change your mind !");
    }
  }
}
