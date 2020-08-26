import { ESLint } from "eslint";
import path from "path";

describe("Normal config", () => {
  const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: require("../src/index.js"),
  });

  it("should result to something in ts", async () => {
    const invalidTs =
      "packages/eslint-config-react-native/example/recommended-example.tsx";
    const result = await eslint.lintFiles([invalidTs]);

    expect(result).toEqual([
      {
        filePath: path.resolve(invalidTs),
        messages: [
          {
            column: 1,
            endColumn: 31,
            endLine: 1,
            fix: {
              range: [30, 30],
              text: `
`,
            },
            line: 1,
            message:
              "There should be at least one empty line between import groups",
            nodeType: "ImportDeclaration",
            ruleId: "import/order",
            severity: 2,
          },
          {
            column: 8,
            endColumn: 15,
            endLine: 1,
            line: 1,
            message: "'example' is defined but never used.",
            messageId: "unusedVar",
            nodeType: "Identifier",
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
          },
          {
            column: 1,
            endColumn: 27,
            endLine: 2,
            fix: {
              range: [0, 58],
              text: `import React from \"react\";
import example from \"./index\";
`,
            },
            line: 2,
            message: "`react` import should occur before import of `./index`",
            nodeType: "ImportDeclaration",
            ruleId: "import/order",
            severity: 2,
          },
          {
            column: 7,
            endColumn: 13,
            endLine: 5,
            line: 5,
            message: "'square' is assigned a value but never used.",
            messageId: "unusedVar",
            nodeType: "Identifier",
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
          },
          {
            column: 7,
            endColumn: 14,
            endLine: 11,
            line: 11,
            message: "'Example' is assigned a value but never used.",
            messageId: "unusedVar",
            nodeType: "Identifier",
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
          },
          {
            column: 28,
            endColumn: 39,
            endLine: 11,
            line: 11,
            message:
              "Raw text (Hello world) cannot be used outside of a <Text> tag",
            nodeType: "JSXText",
            ruleId: "react-native/no-raw-text",
            severity: 2,
          },
        ],
        errorCount: 6,
        fixableErrorCount: 2,
        warningCount: 0,
        fixableWarningCount: 0,
        source: expect.any(String),
        usedDeprecatedRules: expect.any(Array),
      },
    ]);
  });
});

describe("With i18n", () => {
  const baseConfig = require("../src/index.js");

  const fullConfig = {
    ...baseConfig,
    rules: {
      ...(baseConfig.rules || {}),
      "@derniercri/react-native/no-child-string": ["error"],
    },
  };

  const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: fullConfig,
  });

  it("should result to something in ts", async () => {
    const invalidTs =
      "packages/eslint-config-react-native/example/recommended-example.tsx";
    const result = await eslint.lintFiles([invalidTs]);

    expect(result).toEqual([
      {
        filePath: path.resolve(invalidTs),
        messages: [
          {
            column: 1,
            endColumn: 2,
            endLine: 1,
            line: 1,
            message:
              "Definition for rule '@derniercri/react-native/no-child-string' was not found.",
            nodeType: null,
            ruleId: "@derniercri/react-native/no-child-string",
            severity: 2,
          },
          {
            column: 1,
            endColumn: 31,
            endLine: 1,
            fix: {
              range: [30, 30],
              text: `
`,
            },
            line: 1,
            message:
              "There should be at least one empty line between import groups",
            nodeType: "ImportDeclaration",
            ruleId: "import/order",
            severity: 2,
          },
          {
            column: 8,
            endColumn: 15,
            endLine: 1,
            line: 1,
            message: "'example' is defined but never used.",
            messageId: "unusedVar",
            nodeType: "Identifier",
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
          },
          {
            column: 1,
            endColumn: 27,
            endLine: 2,
            fix: {
              range: [0, 58],
              text: `import React from \"react\";
import example from \"./index\";
`,
            },
            line: 2,
            message: "`react` import should occur before import of `./index`",
            nodeType: "ImportDeclaration",
            ruleId: "import/order",
            severity: 2,
          },
          {
            column: 7,
            endColumn: 13,
            endLine: 5,
            line: 5,
            message: "'square' is assigned a value but never used.",
            messageId: "unusedVar",
            nodeType: "Identifier",
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
          },
          {
            column: 7,
            endColumn: 14,
            endLine: 11,
            line: 11,
            message: "'Example' is assigned a value but never used.",
            messageId: "unusedVar",
            nodeType: "Identifier",
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
          },
          {
            column: 28,
            endColumn: 39,
            endLine: 11,
            line: 11,
            message:
              "Raw text (Hello world) cannot be used outside of a <Text> tag",
            nodeType: "JSXText",
            ruleId: "react-native/no-raw-text",
            severity: 2,
          },
        ],
        errorCount: 7,
        fixableErrorCount: 2,
        warningCount: 0,
        fixableWarningCount: 0,
        source: expect.any(String),
        usedDeprecatedRules: expect.any(Array),
      },
    ]);
  });
});
