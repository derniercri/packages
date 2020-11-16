import { Command, flags } from "@oclif/command";
import Listr from "listr";
import * as fs from "fs";
import path from "path";
import get from "lodash.get";
import { getFiles } from "../../utils/i18n";

// My personal test command
// (cd packages/cli && yarn derniercri i18n:check -d ../react-native-i18n/example/src/i18n/dictionaries --src ../react-native-i18n/example/src)

export default class I18NCheck extends Command {
  static description = "Checks your code for missing translations";

  static flags = {
    help: flags.help({ char: "h", description: "Show this help" }),
    dictionaries: flags.string({
      char: "d",
      description: "Your dictionaries root path",
      required: true,
    }),
    src: flags.string({ description: "Your source path", default: "./src" }),
  };

  static examples = [`$ derniercri i18n:check -d ./src/i18n/dictionaries`];

  async run() {
    const { flags } = this.parse(I18NCheck);

    const tasks = new Listr([
      {
        title: "Check directory exists",
        task: () => {
          if (!flags.dictionaries) {
            this.log("You have to give `dictionaries` flag\n");
            this._help();
          }
        },
      },
      {
        title: "Build translations JSON",
        task: async (ctx) => {
          const dictionaries: { [key: string]: unknown } = {};

          for await (const filePath of getFiles(flags.dictionaries as string)) {
            const fullName = path.basename(filePath);

            const [fileName, fileExtension] = fullName.split(".");

            if (fileExtension === "json") {
              const fileContent = fs.readFileSync(filePath, "utf-8");
              dictionaries[fileName] = JSON.parse(fileContent);
            }
          }

          ctx.dictionaries = dictionaries;
        },
      },
      {
        title: "Check for missing translations",
        task: async (ctx, task) => {
          const missings: string[] = [];
          let totalFileCount = 0;
          let keysCount = 0;

          const SOURCE_PATH = flags.src || "./src";

          for await (const fileName of getFiles(SOURCE_PATH)) {
            if ([".tsx", ".ts", ".js", ".tsx"].includes(path.extname(fileName))) {
              totalFileCount += 1;

              const fileContent = fs.readFileSync(fileName, "utf-8");
              const regex = /i18n.t\(['"](.*)['"],? ?({.*})?\)/gm;
              const forbiddenRegex = /\.(test\.tsx?)/;

              if (!fileName.match(forbiddenRegex)) {
                const regexResult = Array.from(fileContent.matchAll(regex), (m) => m[1]);

                if (regexResult) {
                  regexResult.forEach((key) => {
                    keysCount += 1;

                    Object.entries(ctx.dictionaries).forEach(([lng, dict]) => {
                      if (get(dict, key)) {
                        // ok
                      } else {
                        missings.push(
                          `${fileName} - [missing translation] - language: ${lng} - key: ${key}`
                        );
                      }
                    });
                  });
                }
              }
            }
          }

          task.title = `Translations: keys: ${keysCount} / total files: ${totalFileCount}`;

          if (missings.length) {
            throw new Error(`Missing translations found :\n\n${missings.join("\n")}`);
          }
        },
      },
    ]);

    tasks.run().catch(require("@oclif/errors/handle"));
  }
}
