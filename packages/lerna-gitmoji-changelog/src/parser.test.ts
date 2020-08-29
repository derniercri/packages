import { parseLog } from "./parser";

describe("Parser", function () {
  describe("parseLog", () => {
    it("should throw an error if log is empty", () => {
      expect(() => {
        parseLog("");
      }).toThrow();
    });

    it("should parse correctly", () => {
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
packages/react-native-template-derniercri/template/_eslintrc.js
4cbccfc :wrench: Better TypeScript coding
.eslintrc
package.json
tsconfig.json
yarn.lock
e6138ef :white_check_mark: Fixed tests
packages/eslint-config-react-native/__tests__/index.test.js
`;
      const expectedResult: ReturnType<typeof parseLog> = [
        {
          hash: "ac6fdcd",
          longHash: 'ac6fdcdf4616e857801095e255064f966b519724',
          gitmoji: ":bookmark:",
          gitmojiName: "bookmark",
          commit: "Publish v3.3.4",
          files: [
            "CHANGELOG.md",
            "lerna.json",
            "packages/cli-tools/package.json",
            "packages/eslint-config-react-native/package.json",
            "packages/eslint-plugin-i18n/package.json",
            "packages/react-native-template-derniercri/package.json",
          ],
          packageFiles: [
            "packages/cli-tools/package.json",
            "packages/eslint-config-react-native/package.json",
            "packages/eslint-plugin-i18n/package.json",
            "packages/react-native-template-derniercri/package.json",
          ],
        },
        {
          hash: "2458c93",
          longHash: '2458c9391ecf8bfdcca540e186e7ad50efca70ff',
          gitmoji: ":white_check_mark:",
          gitmojiName: "white_check_mark",
          commit: "Better tests",
          files: [
            "packages/eslint-config-react-native/__tests__/index.test.js",
            "packages/eslint-config-react-native/example/recommended-example.tsx",
            "packages/eslint-config-react-native/src/configs/default.js",
            "packages/react-native-template-derniercri/template/_eslintrc.js",
          ],
          packageFiles: [
            "packages/eslint-config-react-native/__tests__/index.test.js",
            "packages/eslint-config-react-native/example/recommended-example.tsx",
            "packages/eslint-config-react-native/src/configs/default.js",
            "packages/react-native-template-derniercri/template/_eslintrc.js",
          ],
        },
        {
          hash: "4cbccfc",
          longHash: '4cbccfc58f0347227a3a4fb242d0c0a395d1a40a',
          gitmoji: ":wrench:",
          gitmojiName: "wrench",
          commit: "Better TypeScript coding",
          files: [".eslintrc", "package.json", "tsconfig.json", "yarn.lock"],
          packageFiles: [],
        },
        {
          hash: "e6138ef",
          longHash: 'e6138ef2c1ce58612cc7dcc66e63ae7087061d07',
          gitmoji: ":white_check_mark:",
          gitmojiName: "white_check_mark",
          commit: "Fixed tests",
          files: ["packages/eslint-config-react-native/__tests__/index.test.js"],
          packageFiles: ["packages/eslint-config-react-native/__tests__/index.test.js"],
        },
      ];
      expect(parseLog(snippet)).toEqual(expectedResult);
    });
  });
});
