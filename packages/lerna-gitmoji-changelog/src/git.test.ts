import childProcess from "child_process";
import { getLastTag, getFilesInHash, getDiffBetweenTags } from "./git";

jest.mock("child_process");

const execSync = jest.fn().mockImplementation(() => "v3.3.4");
childProcess.execSync = execSync;

describe("Git", () => {
  describe("getLastTag", () => {
    it("should return last tag", () => {
      const result = getLastTag();
      expect(execSync).toHaveBeenCalledWith(
        "git describe --tags $(git rev-list --tags --max-count=1)",
        {
          encoding: "utf8",
        }
      );
      expect(result).toBe("v3.3.4");
    });
  });

  describe("getDiffBetweenTags", () => {
    it("should return correct value", () => {
      const snippet = `ac6fdcd (HEAD -> master, tag: v3.3.4, origin/master) :bookmark: Publish v3.3.4
CHANGELOG.md
lerna.json
packages/cli-tools/package.json
packages/eslint-config-react-native/package.json
packages/eslint-plugin-i18n/package.json
packages/react-native-template-derniercri/package.json
2458c93 :white_check_mark: Better tests
packages/eslint-config-react-native/__tests__/index.test.js
packages/eslint-config-react-native/example/recommended-example.tsx
packages/eslint-config-react-native/src/configs/default.js
packages/react-native-template-derniercri/template/_eslintrc.js`;
      const execSync = jest.fn().mockImplementation(() => snippet);
      childProcess.execSync = execSync;

      expect(getDiffBetweenTags("v3.3.2")).toBe(snippet);
    });
  });

  describe("getFilesInHash", () => {
    it("should return correct files", () => {
      const execSync = jest.fn().mockImplementation(
        () => `.eslintrc
package.json
tsconfig.json
yarn.lock`
      );
      childProcess.execSync = execSync;

      const result = getFilesInHash("abc1234");
      expect(result).toEqual([".eslintrc", "package.json", "tsconfig.json", "yarn.lock"]);
    });
  });
});
