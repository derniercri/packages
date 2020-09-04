#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

//#region Templates
const generateIndexFile = (fileName: string) => {
  return `export { default } from './${fileName}';
`;
};

//#region Component file
const generateNativeComponentFile = (componentName: string) => {
  return `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => (
  <View style={styles.wrapper}>
    <Text>Hello World</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
});

export default ${componentName};
`;
};

const generateReactComponentFile = (componentName: string, fileName: string) => {
  return `import React from 'react';

import styles from './${fileName}.module.scss';

interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => (
  <div className={styles.wrapper}>Hello World</div>
);

export default ${componentName};
`;
};

const generateComponentFile = (componentName: string, fileName: string, isNative: boolean) => {
  if (isNative) {
    return generateNativeComponentFile(componentName);
  }
  return generateReactComponentFile(componentName, fileName);
};
//#endregion

const generateStyleFile = () => {
  return `@import "src/styles/colors";

.wrapper {
  background-color: $white;
}
`;
};

const generateTestFile = (componentName: string, fileName: string) => {
  return `import { render } from '@testing-library/react-native';
import React from 'react';

import ${componentName} from './${fileName}';

it('renders correctly', () => {
  render(<${componentName} />);
});
`;
};

//#region Story file
const generateReactStoryFile = (componentName: string, fileName: string) => {
  return `import React from 'react';

import ${componentName} from './${fileName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
};

export const Default = () => <${componentName} />;
`;
};

const generateNativeStoryFile = (componentName: string) => {
  return `import { storiesOf } from '@storybook/react-native';
import React from 'react';

import ${componentName} from './';

storiesOf('${componentName}', module).add('default', () => (
  <${componentName} />
));
`;
};

const generateStoryFile = (componentName: string, fileName: string, isNative: boolean) => {
  if (isNative) {
    return generateNativeStoryFile(componentName);
  }
  return generateReactStoryFile(componentName, fileName);
};
//#endregion
//#endregion

const toCamelCase = (str: string) => {
  const match = str.match(/[a-z]+/g);

  if (!match) throw new Error("String is invalid.");

  return match.map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join("");
};

const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

inquirer
  .prompt([
    {
      type: "list",
      name: "appType",
      message: "What is your app type ?",
      choices: ["React", "React-Native"],
    },
    {
      type: "input",
      name: "componentName",
      message: "What is the component name ?",
    },
    {
      type: "fuzzypath",
      excludePath: (nodePath: string) => nodePath.startsWith("node_modules"),
      itemType: "directory",
      name: "destination",
      message: "Select a target directory",
      rootPath: "src",
      default: "src/components/",
    },
  ])
  .then(({ componentName, destination, appType }) => {
    const finalComponentName = toCamelCase(toKebabCase(componentName));
    const folderName = toKebabCase(finalComponentName);
    const fullDestination = `./${destination}/${folderName}`;
    const IS_NATIVE = appType !== "React";

    if (!fs.existsSync(fullDestination)) {
      fs.mkdirSync(fullDestination);
    }

    if (!IS_NATIVE) {
      fs.writeFileSync(`${fullDestination}/${folderName}.module.scss`, generateStyleFile());
    }

    fs.writeFileSync(`${fullDestination}/index.ts`, generateIndexFile(folderName));
    fs.writeFileSync(
      `${fullDestination}/${folderName}.tsx`,
      generateComponentFile(finalComponentName, folderName, IS_NATIVE)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.test.tsx`,
      generateTestFile(finalComponentName, folderName)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.stories.tsx`,
      generateStoryFile(finalComponentName, folderName, IS_NATIVE)
    );
  });
