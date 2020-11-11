export const toCamelCase = (str: string) => {
  const match = str.match(/[a-z]+/g);

  if (!match) throw new Error("String is invalid.");

  return match.map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join("");
};

export const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
