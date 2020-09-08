import fs from "fs";

import { SetupFunctionReturn } from "../../../../types";

const ESLINT_FILES = [
  ".eslintrc",
  ".eslintrc.json",
  ".eslintrc.js",
  ".eslintrc.yml",
  ".eslintrc.yaml",
];

const WHITELIST = [".eslintrc"];

const generateEslintRc = (): SetupFunctionReturn["files"] => {
  let path = ".eslintrc";
  let currentEslintRc = "{}";

  ESLINT_FILES.forEach((eslintPath) => {
    if (fs.existsSync(`./${eslintPath}`)) {
      currentEslintRc = fs.readFileSync(`./${eslintPath}`, { encoding: "utf8" });
      return;
    }
  });

  if (!WHITELIST.includes(path)) {
    console.error(
      `We cannot work with \`${path}\` file type yet.\nRetry with a \`.eslintrc\` file instead.`
    );
    process.exit(1);
  }

  const asJson = JSON.parse(currentEslintRc);

  asJson.extends = [...new Set([...(asJson.extends || []), "@derniercri/react-native"])];
  asJson.rules = {
    ...(asJson.rules || {}),
    "@derniercri/i18n/no-child-string": ["error"],
  };

  return [{ fileName: path, dir: ".", content: JSON.stringify(asJson, null, 2) }];
};

export default generateEslintRc;
