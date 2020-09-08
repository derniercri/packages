import inquirer from "inquirer";
import mergeWith from "lodash.mergewith";

import { SetupFunctionReturn } from "../../types";
import setupRedux from "./redux";
import setupI18n from "./i18n";

function customizer(objValue: unknown, srcValue: unknown) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const askQuestions = async (): Promise<SetupFunctionReturn> => {
  let packages: SetupFunctionReturn["packages"] = {
    dependencies: [],
    devDependencies: [],
  };
  let files: SetupFunctionReturn["files"] = [];

  const { libs } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "libs",
      choices: [
        { value: "redux", name: "Redux" },
        { value: "flipper", name: "Flipper" },
        { value: "i18n", name: "i18n" },
      ],
    },
  ]);

  const hasFlipper = libs.includes("flipper");

  // let result: SetupFunctionReturn;
  if (libs.includes("redux")) {
    const result = await setupRedux({ hasFlipper });
    packages = mergeWith(packages, result.packages, customizer);
    files = mergeWith(files, result.files, customizer);
  }
  if (hasFlipper) {
    packages = mergeWith(packages, { devDependencies: ["react-native-flipper"] }, customizer);
  }

  if (libs.includes("i18n")) {
    const result = await setupI18n();
    packages = mergeWith(packages, result.packages, customizer);
    files = mergeWith(files, result.files, customizer);
  }

  return { packages, files };
};

export default askQuestions;
