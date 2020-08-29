import * as git from "./git";
import { parseLog } from "./parser";

const getLongHash = jest.fn(() => `abcdef123456`);
const getFilesInHash = jest.fn(() => ["packages/toto"]);

jest.mock("./git");
(git as any).getLongHash = getLongHash;
(git as any).getFilesInHash = getFilesInHash;

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
          longHash: "abcdef123456",
          gitmoji: ":bookmark:",
          gitmojiName: "bookmark",
          commit: "Publish v3.3.4",
          files: ["packages/toto"],
          packageFiles: ["packages/toto"],
        },
        {
          hash: "2458c93",
          longHash: "abcdef123456",
          gitmoji: ":white_check_mark:",
          gitmojiName: "white_check_mark",
          commit: "Better tests",
          files: ["packages/toto"],
          packageFiles: ["packages/toto"],
        },
        {
          hash: "4cbccfc",
          longHash: "abcdef123456",
          gitmoji: ":wrench:",
          gitmojiName: "wrench",
          commit: "Better TypeScript coding",
          files: ["packages/toto"],
          packageFiles: ["packages/toto"],
        },
        {
          hash: "e6138ef",
          longHash: "abcdef123456",
          gitmoji: ":white_check_mark:",
          gitmojiName: "white_check_mark",
          commit: "Fixed tests",
          files: ["packages/toto"],
          packageFiles: ["packages/toto"],
        },
      ];
      expect(parseLog(snippet)).toEqual(expectedResult);
    });
  });
});
