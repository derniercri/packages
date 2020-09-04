#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

//#region Templates
const generateIndexFile = (fileName) => {
  return `export { default } from './${fileName}';
`;
};

const generateComponentFile = (componentName) => {
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

const generateTestFile = (componentName, fileName) => {
  return `import { render } from '@testing-library/react-native';
import React from 'react';

import ${componentName} from './${fileName}';

it('renders correctly', () => {
  render(<${componentName} />);
});
`;
};

const generateStoryFile = (componentName, fileName) => {
  return `import { storiesOf } from '@storybook/react-native';
import React from 'react';

import ${componentName} from './';

storiesOf('${componentName}', module).add('default', () => (
  <${componentName} />
));
`;
};
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

inquirer
  .prompt([
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
  .then(({ componentName, destination }) => {
    const finalComponentName = toCamelCase(toKebabCase(componentName));
    const folderName = toKebabCase(finalComponentName);
    const fullDestination = `./${destination}/${folderName}`;

    if (!fs.existsSync(fullDestination)) {
      fs.mkdirSync(fullDestination);
    }

    fs.writeFileSync(
      `${fullDestination}/index.ts`,
      generateIndexFile(folderName)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.tsx`,
      generateComponentFile(finalComponentName, folderName)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.test.tsx`,
      generateTestFile(finalComponentName, folderName)
    );
    fs.writeFileSync(
      `${fullDestination}/${folderName}.stories.tsx`,
      generateStoryFile(finalComponentName, folderName)
    );
  });
