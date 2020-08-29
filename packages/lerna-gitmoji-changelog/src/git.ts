import { execSync } from "child_process";

const exec = (command: string) => execSync(command, { encoding: "utf8" });

/**
 * Get the last tag in the repository
 * @returns {String} A tag, should be `vX.X.X`
 */
export const getLastTag = (): string =>
  exec("git describe --tags $(git rev-list --tags --max-count=1)");

/**
 *
 * @param previousTag The previous tag
 * @param {String} [nextTag=HEAD] The next tag, or HEAD
 * @returns {String} The log
 */
export const getDiffBetweenTags = (previousTag: string, nextTag: "HEAD" | string = "HEAD") =>
  exec(`git log --name-only --oneline ${previousTag}..${nextTag}`);

/**
 * Returns all files updated in a commit
 * @param {String} hash The commit hash
 */
export const getFilesInHash = (hash: string) =>
  exec(`git show --pretty="format:" --name-only ${hash}`).split("\n");

export const getTagDate = (tagName: string) => exec(`git log -1 --format=%ad --date=short ${tagName}`).replace('\n', '');
