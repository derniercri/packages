/**
 * This config is using @react-native-community/eslint-config
 * It's a good reference since it already includes so much good things.
 */

module.exports = {
  extends: ["@react-native-community", "plugin:react-native/all", "prettier"],
  rules: {
    "no-empty-function": "off",
  },
};
