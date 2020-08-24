#!/usr/bin/env node

const inquirer = require("inquirer");
const yargs = require("yargs");
const fs = require("fs");

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

//#region Templates
const generateIndexFile = (fileName) => {
  return `export { default } from './${fileName}';
`;
};

//#region Component file
const generateNativeComponentFile = (componentName) => {
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

const generateReactComponentFile = (componentName, fileName) => {
  return `import React from 'react';

import styles from './${fileName}.module.scss';

interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => (
  <div className={styles.wrapper}>Hello World</div>
);

export default ${componentName};
`;
};

const generateComponentFile = (componentName, fileName, isNative) => {
  if (isNative) {
    return generateNativeComponentFile(componentName);
  }
  return generateReactComponentFile(componentName, fileName);
};
//#endregion

const generateStyleFile = (componentName, fileName) => {
  return `@import "src/styles/colors";

.wrapper {
  background-color: $white;
}
`;
};

const generateTestFile = (componentName, fileName) => {
  return `import { render } from '@testing-library/react-native';
import React from 'react';

import ${componentName} from './${fileName}';

it('renders correctly', () => {
  render(<${componentName} />);
});
`;
};

//#region Story file
const generateReactStoryFile = (componentName, fileName) => {
  return `import React from 'react';

import ${componentName} from './${fileName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
};

export const Default = () => <${componentName} />;
`;
};

const generateNativeStoryFile = (componentName, fileName) => {
  return `import { storiesOf } from '@storybook/react-native';
import React from 'react';

import ${componentName} from './';

storiesOf('${componentName}', module).add('default', () => (
  <${componentName} />
));
`;
};

const generateStoryFile = (componentName, fileName, isNative) => {
  if (isNative) {
    return generateNativeStoryFile(componentName, fileName);
  }
  return generateReactStoryFile(componentName, fileName);
};
//#endregion
//#endregion

const toCamelCase = (str) =>
  str
    .match(/[a-z]+/g)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join("");

const toKebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

const options = yargs.usage("Usage: -n <name>").option("n", {
  alias: "name",
  describe: "The component name",
  type: "string",
  demandOption: false,
}).argv;

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
      excludePath: (nodePath) => nodePath.startsWith("node_modules"),
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
      fs.writeFileSync(
        `${fullDestination}/${folderName}.module.scss`,
        generateStyleFile(finalComponentName, folderName)
      );
    }

    fs.writeFileSync(
      `${fullDestination}/index.ts`,
      generateIndexFile(folderName)
    );
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
