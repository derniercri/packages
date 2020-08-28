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
            ruleId: "import/order",
            severity: 2,
            message:
              "There should be at least one empty line between import groups",
            line: 1,
            column: 1,
            nodeType: "ImportDeclaration",
            endLine: 1,
            endColumn: 31,
            fix: { range: [30, 30], text: "\n" },
          },
          {
            ruleId: "import/order",
            severity: 2,
            message:
              "`./index` import should occur after import of `react-native`",
            line: 1,
            column: 1,
            nodeType: "ImportDeclaration",
            endLine: 1,
            endColumn: 31,
            fix: {
              range: [0, 95],
              text:
                'import React from "react";\n' +
                'import { Text } from "react-native";\n' +
                'import example from "./index";\n',
            },
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'example' is defined but never used.",
            line: 1,
            column: 8,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 1,
            endColumn: 15,
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'square' is assigned a value but never used.",
            line: 6,
            column: 7,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 6,
            endColumn: 13,
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'Example' is assigned a value but never used.",
            line: 12,
            column: 7,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 12,
            endColumn: 14,
          },
          {
            ruleId: "react-native/no-raw-text",
            severity: 2,
            message:
              "Raw text (Hello world) cannot be used outside of a <Text> tag",
            line: 12,
            column: 28,
            nodeType: "JSXText",
            endLine: 12,
            endColumn: 39,
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'Example2' is assigned a value but never used.",
            line: 13,
            column: 7,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 13,
            endColumn: 15,
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

describe("With i18n", () => {
  const baseConfig = require("../src/index.js");

  const fullConfig = {
    ...baseConfig,
    rules: {
      ...(baseConfig.rules || {}),
      "@derniercri/i18n/no-child-string": ["error"],
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
            ruleId: "import/order",
            severity: 2,
            message:
              "There should be at least one empty line between import groups",
            line: 1,
            column: 1,
            nodeType: "ImportDeclaration",
            endLine: 1,
            endColumn: 31,
            fix: { range: [30, 30], text: "\n" },
          },
          {
            ruleId: "import/order",
            severity: 2,
            message:
              "`./index` import should occur after import of `react-native`",
            line: 1,
            column: 1,
            nodeType: "ImportDeclaration",
            endLine: 1,
            endColumn: 31,
            fix: {
              range: [0, 95],
              text:
                'import React from "react";\n' +
                'import { Text } from "react-native";\n' +
                'import example from "./index";\n',
            },
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'example' is defined but never used.",
            line: 1,
            column: 8,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 1,
            endColumn: 15,
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'square' is assigned a value but never used.",
            line: 6,
            column: 7,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 6,
            endColumn: 13,
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'Example' is assigned a value but never used.",
            line: 12,
            column: 7,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 12,
            endColumn: 14,
          },
          {
            ruleId: "@derniercri/i18n/no-child-string",
            severity: 2,
            message: "Raw text `Hello world` cannot be used as children",
            line: 12,
            column: 28,
            nodeType: "JSXText",
            endLine: 12,
            endColumn: 39,
          },
          {
            ruleId: "react-native/no-raw-text",
            severity: 2,
            message:
              "Raw text (Hello world) cannot be used outside of a <Text> tag",
            line: 12,
            column: 28,
            nodeType: "JSXText",
            endLine: 12,
            endColumn: 39,
          },
          {
            ruleId: "@typescript-eslint/no-unused-vars",
            severity: 2,
            message: "'Example2' is assigned a value but never used.",
            line: 13,
            column: 7,
            nodeType: "Identifier",
            messageId: "unusedVar",
            endLine: 13,
            endColumn: 15,
          },
          {
            ruleId: "@derniercri/i18n/no-child-string",
            severity: 2,
            message: "Raw text `Hello world` cannot be used as children",
            line: 13,
            column: 30,
            nodeType: "JSXText",
            endLine: 13,
            endColumn: 41,
          },
        ],
        errorCount: 9,
        fixableErrorCount: 2,
        warningCount: 0,
        fixableWarningCount: 0,
        source: expect.any(String),
        usedDeprecatedRules: expect.any(Array),
      },
    ]);
  });
});
