#!/usr/bin/env node

import inquirer from "inquirer";
import childProcess from "child_process";
import fs from "fs";
import chalk from "chalk";
import logSymbols from "log-symbols";

import askQuestions from "./native/questions";
import { SetupFunctionReturn } from "../types";

const installDependencies = (deps: string[], dev?: boolean) => {
  if (!deps.length) return true;
  let cmd = "yarn add ";
  if (dev) cmd += "-D ";
  cmd += deps.join(" ");
  childProcess.execSync(cmd);
};

(async () => {
  let allDependencies: string[] = [];
  let allDevDependencies: string[] = [];
  let allFiles: SetupFunctionReturn["files"] = [];

  const { lib } = await inquirer.prompt([
    {
      type: "list",
      name: "lib",
      message: "What's your app type?",
      choices: [
        { name: "React", value: "react" },
        { name: "React-Native", value: "native" },
      ],
    },
  ]);

  if (lib === "native") {
    const {
      packages: { devDependencies, dependencies },
      files,
    } = await askQuestions();
    allDependencies = allDependencies.concat(dependencies);
    allDevDependencies = allDevDependencies.concat(devDependencies);
    allFiles = allFiles.concat(files);
  }

  console.log(
    chalk.bold.white(
      `${logSymbols.info} Will now install dependencies ${allDependencies.join(" ")}`
    )
  );

  console.log(
    chalk.bold.white(`${logSymbols.info} And dev dependencies ${allDevDependencies.join(" ")}`)
  );

  console.log(chalk.bold.cyan("Installing packages..."));
  installDependencies(allDependencies);
  installDependencies(allDevDependencies, true);
  console.log(chalk.bold.cyan(logSymbols.success, "Done !"));

  console.log(chalk.bold.cyan("Creating files and folders..."));
  allFiles.forEach((file) => {
    if (!fs.existsSync(file.dir)) {
      fs.mkdirSync(file.dir, { recursive: true });
    }

    fs.writeFileSync(`${file.dir}/${file.fileName}`, file.content, { encoding: "utf8" });
  });
  console.log(chalk.bold.cyan(logSymbols.success, "Done !"));
})();
