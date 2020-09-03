import semver from "semver";

import * as git from "./git";
import * as changelog from "./changelog";
import * as parser from "./parser";
import fs from "fs";

export const getShouldWriteChangelog = () => {
  const changelogContent = changelog.loadChangelog();

  const lastTag = semver.coerce(git.getLastTag());
  const lastWrittenTag = semver.coerce(changelog.getLastWrittenTag(changelogContent));

  if (!lastWrittenTag) return true;
  if (!lastTag) return false;
  return semver.gt(lastTag, lastWrittenTag);
};

const writeChangelog = (markdown: string) => {
  fs.writeFileSync("./CHANGELOG.md", markdown);
};

export const generateChangelog = () => {
  if (getShouldWriteChangelog()) {
    const changelogContent = changelog.loadChangelog();

    const lastTag = git.getLastTag();
    let lastWrittenTag = changelog.getLastWrittenTag(changelogContent);

    if (!lastWrittenTag) return lastWrittenTag;
    if (!lastWrittenTag.startsWith('v')) {
      lastWrittenTag = `v${lastWrittenTag}`
    }

    const log = git.getDiffBetweenTags(lastWrittenTag, lastTag || 'HEAD');
    const parsed = parser.parseLog(log);
    const markdown = parser.parsedLogToMarkdown(lastTag, parsed);

    writeChangelog(markdown);
    return markdown;
  } else {
    throw new Error('Do not have to generate changelog');
  }
};
