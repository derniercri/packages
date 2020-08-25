module.exports = {
  root: true,
  extends: [
    '@derniercri/react-native',
  ],
  overrides: [
    {
      files: ["*.test.tsx", "*.stories.tsx"],
      rules: {
        "@derniercri/react-native/no-child-string": "off"
      },
    }
  ],
};
