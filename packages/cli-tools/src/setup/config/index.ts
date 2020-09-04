import { SetupFunction } from "../../types";
import files from "./files";
import packages from "./packages";

const setupRedux: SetupFunction = () => {
  return { packages, files };
};

export default setupRedux;
