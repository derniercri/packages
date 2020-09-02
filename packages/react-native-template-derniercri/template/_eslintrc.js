module.exports = {
  root: true,
  extends: ['@derniercri/react-native'],
  rules: {
    'react-native/no-raw-text': ['error', { skip: ['Button'] }],
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.stories.tsx'],
      rules: {
        'react-native/no-raw-text': 'off',
      },
    },
  ],
}
