import { SetupFunction } from "../types";

const setupConfig: SetupFunction = () => {
  const packages = {
    dependencies: ["react-native-config"],
    devDependencies: [],
  };

  const files: any[] = [];

  return { packages, files };
};

export default setupConfig;
