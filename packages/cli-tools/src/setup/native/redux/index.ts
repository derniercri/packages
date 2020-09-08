import { SetupFunctionReturn } from "../../../types";
import generateIndex from "./template";
import generateReducer from "./template/reducer";
import generateFeature from "./template/features/counter";
import generateFeatureTest from "./template/features/counter.test";

interface Options {
  hasFlipper: boolean;
}

const STORE_PATH = "./src/store";
const setupFiles = ({ hasFlipper }: Options): SetupFunctionReturn["files"] => {
  const index = generateIndex({ hasFlipper });
  const reducer = generateReducer();
  const feature = generateFeature();
  const featureTest = generateFeatureTest();

  return [
    { dir: STORE_PATH, fileName: "index.ts", content: index },
    { dir: STORE_PATH, fileName: "reducer.ts", content: reducer },
    { dir: `${STORE_PATH}/features`, fileName: "counter.ts", content: feature },
    { dir: `${STORE_PATH}/features`, fileName: "counter.test.ts", content: featureTest },
  ];
};

const setupRedux = async ({ hasFlipper }: Options): Promise<SetupFunctionReturn> => {
  const packages: SetupFunctionReturn["packages"] = {
    dependencies: ["@reduxjs/toolkit", "@react-native-community/async-storage", "redux-persist"],
    devDependencies: [],
  };
  const files: SetupFunctionReturn["files"] = setupFiles({ hasFlipper });

  if (hasFlipper) {
    packages.devDependencies.push("redux-flipper");
  }

  return { packages, files };
};

export default setupRedux;
