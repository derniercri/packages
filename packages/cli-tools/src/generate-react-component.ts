#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

//#region Templates
const generateIndexFile = (fileName: string) => {
  return `export { default } from './${fileName}';
`;
};

const generateComponentFile = (componentName: string, fileName: string) => {
  return `import React from 'react';

import styles from './${fileName}.module.scss';

interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => (
  <div className={styles.wrapper}>Hello World</div>
);

export default ${componentName};
`;
};

const generateStyleFile = () => {
  return `@import "src/styles/colors";

.wrapper {
  background-color: $white;
}
`;
};

const generateTestFile = (componentName: string, fileName: string) => {
  return `import { render } from '@testing-library/react';
import React from 'react';

import ${componentName} from './${fileName}';

it('renders correctly', () => {
  render(<${componentName} />);
});
`;
};

const generateStoryFile = (componentName: string, fileName: string) => {
  return `import React from 'react';

import ${componentName} from './${fileName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
};

export const Default = () => <${componentName} />;
`;
};
//#endregion

const toCamelCase = (str: string) => {
  const match = str
    .match(/[a-z]+/g);

  if (!match) throw new Error('String is invalid.');

  return match.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join("");
}


const toKebabCase = (str: string) =>
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
      excludePath: (nodePath: string) => nodePath.startsWith("node_modules"),
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
      `${fullDestination}/${folderName}.module.scss`,
      generateStyleFile()
    );
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
