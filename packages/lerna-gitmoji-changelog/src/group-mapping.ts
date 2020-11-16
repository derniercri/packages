import gitmojis from "./gitmojis";

type Groups = {
  [key: string]: {
    label: string;
    emojis: string[];
  };
};

export const groups: Groups = {
  added: {
    label: "Added",
    emojis: [
      "rocket",
      "hammer",
      "sparkles",
      "tada",
      "white_check_mark",
      "construction_worker",
      "chart_with_upwards_trend",
      "heavy_plus_sign",
      "loud_sound",
    ],
  },
  changed: {
    label: "Changed",
    emojis: [
      "alien",
      "arrow_down",
      "arrow_up",
      "art",
      "bento",
      "building_construction",
      "card_file_box",
      "children_crossing",
      "iphone",
      "lipstick",
      "pencil",
      "pushpin",
      "recycle",
      "rewind",
      "rotating_light",
      "speech_balloon",
      "truck",
      "wheelchair",
      "wrench",
      "zap",
    ],
  },
  breaking_changes: {
    label: "Breaking changes",
    emojis: ["boom"],
  },
  deprecated: {
    label: "Deprecated",
    emojis: [],
  },
  removed: {
    label: "Removed",
    emojis: ["fire", "heavy_minus_sign", "mute"],
  },
  fixed: {
    label: "Fixed",
    emojis: [
      "ambulance",
      "apple",
      "bug",
      "checkered_flag",
      "green_apple",
      "green_heart",
      "pencil2",
      "penguin",
      "robot",
    ],
  },
  security: {
    label: "Security",
    emojis: ["lock"],
  },
  useless: {
    label: "Useless",
    emojis: ["bookmark"],
  },
  misc: {
    label: "Miscellaneous",
    emojis: [],
  },
};

export const getGroupForGitmoji = (gitmoji: string) => {
  return Object.entries(groups).find(([, group]) => group.emojis.includes(gitmoji))![0];
};

export const getLabelForGroup = (group: keyof typeof groups) => groups[group].label;

export const getGitmojiFromName = (gitmojiCode: string) =>
  gitmojis.gitmojis.find((gmj) => gmj.code === gitmojiCode)!.emoji;
