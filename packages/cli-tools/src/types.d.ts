export type SetupFunction = () => {
  packages: {
    dependencies: string[];
    devDependencies: string[];
  };
  files: string[];
};
