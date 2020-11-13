import * as fs from "fs";
import * as execa from "execa";

export const touchGemfile = () => {
  fs.writeFileSync(
    "./Gemfile",
    `source "https://rubygems.org"

gem "fastlane"
`
  );
};
