import gitmojis from './gitmojis.json';

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
      "art",
      "zap",
      "lipstick",
      "rotating_light",
      "arrow_down",
      "arrow_up",
      "pushpin",
      "recycle",
      "wrench",
      "rewind",
      "alien",
      "truck",
      "bento",
      "wheelchair",
      "speech_balloon",
      "card_file_box",
      "children_crossing",
      "building_construction",
      "iphone",
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
      "bug",
      "ambulance",
      "apple",
      "penguin",
      "checkered_flag",
      "robot",
      "green_apple",
      "green_heart",
      "pencil2",
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

export const getGitmojiFromName = (gitmojiCode: string) => gitmojis.gitmojis.find(gmj => gmj.code === gitmojiCode)!.emoji;
