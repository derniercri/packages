type File = {
  dir: string;
  fileName: string;
  content: string;
};

export type SetupFunctionReturn = {
  packages: {
    dependencies: string[];
    devDependencies: string[];
  };
  files: File[];
};
