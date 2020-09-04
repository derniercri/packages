import { SetupFunction } from "../../types";
import files from "./files";
import packages from "./packages";

const setup: SetupFunction = () => {
  return { packages, files };
};

export default setup;
