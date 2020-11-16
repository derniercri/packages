import { Command, flags } from "@oclif/command";
import Listr from "listr";
import { getFiles } from "../../utils/i18n";
import path from "path";
import * as fs from "fs";
import get from "lodash.get";
import set from "lodash.set";

type Dictionaries = { [lngKey: string]: object };
type Missings = { [lngKey: string]: { path: string; value: string }[] };

type Context = {
  dictionaries: Dictionaries;
  missings: Missings;
};

/**
 * My personal test command
 * (cd packages/cli && yarn derniercri i18n:generate-missing -d ../react-native-i18n/example/src/i18n/dictionaries --src ../react-native-i18n/example/src)
 */

export default class I18NGenerateMissing extends Command {
  static description = "Generates missing translations in your code";

  static flags = {
    help: flags.help({ char: "h" }),
    dictionaries: flags.string({
      char: "d",
      description: "Your dictionaries root path",
      required: true,
    }),
    src: flags.string({ description: "Your source path", default: "./src" }),
  };

  static examples = [`$ derniercri i18n:generate-missing -d ./src/i18n/dictionaries`];

  async run() {
    const { flags } = this.parse(I18NGenerateMissing);

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
        task: async (ctx: Context) => {
          const dictionaries: Dictionaries = {};

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
        title: "Get missing translations",
        task: async (ctx) => {
          const missings: { [lngKey: string]: { path: string; value: string }[] } = {};
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
                        missings[lng] = missings[lng] || [];
                        missings[lng].push({ path: key, value: key });
                      }
                    });
                  });
                }
              }
            }
          }

          ctx.missings = missings;
        },
      },
      {
        title: "Generate translations",
        skip: (ctx) => Object.keys(ctx.missings).length === 0,
        task: async (ctx) => {
          const nextDictionaries = { ...ctx.dictionaries };

          Object.entries(ctx.missings).forEach(([lngKey, missings]) => {
            missings.forEach((missing) => {
              set(nextDictionaries, `${lngKey}.${missing.path}`, missing.value);
            });
          });

          for await (const lngDict of getFiles(flags.dictionaries)) {
            const fullName = path.basename(lngDict);
            const [fileName, fileExtension] = fullName.split(".");

            if (fileExtension === "json" && ctx.missings[fileName].length) {
              fs.writeFileSync(lngDict, JSON.stringify(nextDictionaries[fileName], null, 2));
            }
          }
        },
      },
    ]);

    tasks.run().catch(require("@oclif/errors/handle"));
  }
}
