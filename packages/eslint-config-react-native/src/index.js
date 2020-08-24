module.exports = {
  extends: ["./configs/default", "./configs/i18n", "./configs/import"].map(
    require.resolve
  ),
};
