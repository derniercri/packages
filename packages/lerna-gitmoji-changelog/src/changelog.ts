import fs from "fs";

/**
 * Loads the CHANGELOG.md file.
 * @returns {String} CHANGELOG.md content as string.
 */
export const loadChangelog = (): string => fs.readFileSync("./CHANGELOG.md", "utf8");

/**
 * Get the last tag written in CHANGELOG.md
 * @param {String} changeLogContent The CHANGELOG.md content as string.
 * @returns {String|null} The tag, or null if none found.
 */
export const getLastWrittenTag = (changeLogContent: string): string | null => {
  const regex = /## (.*) (?:.*)/;
  const result = regex.exec(changeLogContent);

  if (!result) return null;
  return result[1];
};
