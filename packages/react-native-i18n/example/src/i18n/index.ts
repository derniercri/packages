import I18n from "@derniercri/react-native-i18n";

import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";

const dictionaries = { en, fr } as const;

const i18n = new I18n<typeof dictionaries>();

i18n.configure({ dictionaries });

export default i18n;
