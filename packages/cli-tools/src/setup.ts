#!/usr/bin/env node

import inquirer from "inquirer";
import childProcess from "child_process";
import chalk from "chalk";
import logSymbols from "log-symbols";

import setupRedux from "./setup/redux";
import setupConfig from "./setup/config";

const installDependencies = (deps: string[], dev?: boolean) => {
  if (!deps.length) return true;
  let cmd = "yarn add ";
  if (dev) cmd += "-D ";
  cmd += deps.join(" ");
  childProcess.execSync(cmd);
};

inquirer
  .prompt([
    {
      type: "checkbox",
      choices: [
        { value: "redux", name: "Initialize a Redux store", short: "Redux" },
        { value: "config", name: "react-native-config" },
      ],
      name: "chosen",
    },
  ])
  .then(({ chosen }) => {
    const packages: { dependencies: string[]; devDependencies: string[] } = {
      dependencies: [],
      devDependencies: [],
    };
    const files = [];

    if (chosen.includes("redux")) {
      const {
        packages: { dependencies, devDependencies },
        // files: reduxFiles,
      } = setupRedux();
      packages.dependencies = packages.dependencies.concat(dependencies);
      packages.devDependencies = packages.devDependencies.concat(devDependencies);
    }

    if (chosen.includes("config")) {
      const {
        packages: { dependencies, devDependencies },
        files: configFiles,
      } = setupConfig();
      packages.dependencies = packages.dependencies.concat(dependencies);
      packages.devDependencies = packages.devDependencies.concat(devDependencies);
    }

    console.log(
      chalk.bold.white(
        `${logSymbols.info} Will now install dependencies ${packages.dependencies.join(" ")}`
      )
    );

    console.log(chalk.bold.cyan("Installing packages..."));
    installDependencies(packages.dependencies);
    installDependencies(packages.devDependencies, true);
    console.log(chalk.bold.cyan(logSymbols.success, "Done !"));
  });
