import { SetupFunction } from "../types";

const setupRedux: SetupFunction = () => {
  const packages = {
    dependencies: ["@reduxjs/toolkit", "react-redux", "redux-persist"],
    devDependencies: ["@types/react-redux"],
  };

  const files: any[] = [];

  return { packages, files };
};

export default setupRedux;
