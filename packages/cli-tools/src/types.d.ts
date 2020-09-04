type File = {
  path: string;
  content: string;
};

type SetupFunctionReturn = {
  packages: {
    dependencies: string[];
    devDependencies: string[];
  };
  files: File[];
};

export type SetupFunction = (() => SetupFunctionReturn) | (() => Promise<SetupFunctionReturn>);
