import { SetupFunctionReturn } from "../../../types";
import generateEslintRc from "./templates/eslintrc";

const setupI18n = async (): Promise<SetupFunctionReturn> => {
  const packages: SetupFunctionReturn["packages"] = {
    dependencies: [],
    devDependencies: ["@derniercri/eslint-config-react-native"],
  };
  const files: SetupFunctionReturn["files"] = generateEslintRc();

  return { packages, files };
};

export default setupI18n;
