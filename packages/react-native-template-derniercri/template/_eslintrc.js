module.exports = {
  root: true,
  extends: ["@derniercri/react-native"],
  overrides: [
    {
      files: ["*.test.tsx", "*.stories.tsx"],
      rules: {
        "@derniercri/i18n/no-child-string": "off",
      },
    },
  ],
};
