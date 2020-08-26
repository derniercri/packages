/**
 * This config is using @react-native-community/eslint-config
 * It's a good reference since it already includes so much good things.
 */

module.exports = {
  extends: ["@react-native-community", "react-native", "prettier"],
  rules: {
    // Let TypeScript do its things
    "import/no-extraneous-dependencies": "off",
  },
};
