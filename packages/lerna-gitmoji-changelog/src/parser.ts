import fs from "fs";

import * as changelog from "./changelog";
import * as git from "./git";
import * as groupMapping from "./group-mapping";

type ParsedCommit = {
  hash: string;
  longHash: string;
  gitmoji: string;
  gitmojiName: string;
  commit: string;
  files: string[];
  packageFiles: string[];
};

/**
 * Gets the log, then output parsed log.
 * @param {String} log The log
 * @returns {Array.<ParsedCommit>}
 */
export const parseLog = (log: string) => {
  const regex = /(?<hash>[a-z0-9]{7})(?:.*)(?<gitmoji>:(?<gitmojiName>.*):) (?<commit>.*)/gm;

  const result = [...log.matchAll(regex)];
  if (!result.length) throw new RangeError("Cannot parse the log");

  return result.map((r) => {
    const longHash = git.getLongHash(r.groups!.hash);
    const filesUpdated = git.getFilesInHash(r.groups!.hash).filter(Boolean);
    const packageFiles = filesUpdated.filter((file) => /packages\//.test(file));

    return { ...r.groups, files: filesUpdated, packageFiles, longHash };
  }) as ParsedCommit[];
};

export const getPackageFromFile = (fileName: string) => {
  if (!fileName.startsWith('packages/')) return null;
  return fileName.split('/')[1];
};

export const parsedLogToMarkdown = (tag: string, parsedLog: ParsedCommit[]) => {
  const currentChangelog = changelog.loadChangelog();
  const tagDate = git.getTagDate(tag);
  const remote = git.getRemoteAtHttps();

  const groupedParsedLog = parsedLog.reduce((all, commit) => {
    const group = groupMapping.getGroupForGitmoji(commit.gitmojiName);

    if (!all[group]) all[group] = [];
    all[group].push(commit);

    return all;
  }, {} as { [key: string]: ParsedCommit[] });

  const result = Object.entries(groupedParsedLog).reduce(
    (final, group) => {
      const [name, commits] = group;
      const label = groupMapping.getLabelForGroup(name);

      if (name === "useless") return final;

      final += `

### ${label}
`;
      commits.forEach(({ gitmoji, commit, hash, longHash, packageFiles }) => {
        const uniqPackages = [...new Set(packageFiles.map(getPackageFromFile))].filter(Boolean);
        final += `
- ${groupMapping.getGitmojiFromName(gitmoji)} ${commit} [[${hash}](${remote}/commit/${longHash})]`;

        final += uniqPackages.map(pf => `
  - \`${pf}\``)
      });

      return final;
    },
    `# Changelog

<a name="${tag}"></a>
## ${tag} (${tagDate})`
  );

  return currentChangelog.replace("# Changelog", result);
};
