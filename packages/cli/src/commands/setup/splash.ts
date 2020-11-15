import { Command, flags } from "@oclif/command";
import Listr from "listr";
import fs from "fs";
import execa from "execa";
import highlight from "cli-highlight";

export default class SetupSplash extends Command {
  static description = "Setup react-native-splash-screen";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  async run() {
    const KEY = "DC-SPLASH";
    const mainAndroidPath = "./android/app/src/main/java/com";
    const androidProjectName = fs.readdirSync(mainAndroidPath, { withFileTypes: true })[0].name;
    const fullAndroidPath = `${mainAndroidPath}/${androidProjectName}`;
    const mainActivityContent = fs.readFileSync(`${fullAndroidPath}/MainActivity.java`, "utf-8");

    const mainIosPath = "./ios";
    const iosProjectPath = fs
      .readdirSync(mainIosPath, { withFileTypes: true })
      .filter((dirent) => !["Pods", "Podfile", "Podfile.lock"].includes(dirent.name))[0].name;
    const fullIosPath = `${mainIosPath}/${iosProjectPath}`;
    const appDelegateContent = fs.readFileSync(`${fullIosPath}/AppDelegate.m`, "utf-8");

    const tasks = new Listr([
      {
        title: "Check for compatibility",
        task: async () => {
          try {
            const doesActivityContainsImportKey = new RegExp(`${KEY}-IMPORT`).test(
              mainActivityContent
            );
            const doesActivityContainsOncreateKey = new RegExp(`${KEY}-ONCREATE`).test(
              mainActivityContent
            );
            const doesAppDelegateContainsImportKey = new RegExp(`${KEY}-IMPORT`).test(
              appDelegateContent
            );
            const doesAppDelegateContainsOncreateKey = new RegExp(`${KEY}-ONCREATE`).test(
              appDelegateContent
            );

            if (
              [
                doesActivityContainsImportKey,
                doesActivityContainsOncreateKey,
                doesAppDelegateContainsImportKey,
                doesAppDelegateContainsOncreateKey,
              ].some((p) => !p)
            ) {
              this.error("Incompatible", {
                suggestions: [
                  "This may be because you created your project with a `react-native-template-derniercri` version < 4.3.0",
                ],
              });
            }
          } catch (error) {
            const oclifHandler = require("@oclif/errors/handle");
            // do any extra work with error
            return oclifHandler(error);
          }
        },
      },
      {
        title: "Package installation",
        skip: () => true,
        task: async () => {
          await execa("yarn", ["add", "react-native-splash-screen"]);
          await execa.command("npx pod-install ios");
        },
      },
      {
        title: "Configuration",
        skip: () => true,
        task: () => {
          const nextActivityContent = mainActivityContent
            .replace(`// ${KEY}-IMPORT`, "import org.devio.rn.splashscreen.SplashScreen;")
            .replace(
              `// ${KEY}-ONCREATE`,
              `@Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }`
            );

          const nextAppDelegateContent = appDelegateContent
            .replace(`// ${KEY}-IMPORT`, '#import "RNSplashScreen.h"')
            .replace(`// ${KEY}-ONCREATE`, "[RNSplashScreen show];");

          fs.writeFileSync(`${fullAndroidPath}/MainActivity.java`, nextActivityContent);
          fs.writeFileSync(`${mainIosPath}/AppDelegate.m`, nextAppDelegateContent);
        },
      },
    ]);

    tasks.run().then(() => {
      this.log(
        `
You can now use it in you app !

To be able to see it work rapidly, you can add in your \`App.tsx\` :

`,
        highlight("import SplashScreen from 'react-native-splash-screen'"),
        `

And in the \`App\` component :
`,
        highlight(
          `
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
  }, [])
`,
          { language: "typescript" }
        )
      );

      this.log(
        "Don't forget to follow instructions at https://github.com/crazycodeboy/react-native-splash-screen#getting-started to create your custom splash screen"
      );
    });
  }
}
