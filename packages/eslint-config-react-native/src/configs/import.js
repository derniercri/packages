/**
 * This config is using eslint-plugin-import
 */

module.exports = {
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    //#region Let TypeScript do its things
    "import/no-extraneous-dependencies": "off",
    "import/default": "off",
    "import/no-unresolved": "off",
    "import/namespace": "off",
    //#endregion

    // Just, why ??
    "import/prefer-default-export": "off",

    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["external", "builtin", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "{components,components/*,modules,modules/*}",
            group: "builtin",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};
