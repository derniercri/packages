import get from "lodash.get";
import * as RNLocalize from "react-native-localize";

type Dictionaries = { [languageKey: string]: unknown };

class I18n<T extends Dictionaries> {
  dictionaries = {} as T;

  private preferredLanguage = RNLocalize.getLocales()[0].languageCode;
  private fallbackLanguage = Object.keys(this.dictionaries)[0];

  private languageKey = this.preferredLanguage || this.fallbackLanguage;

  public setLocale = (lngKey: string) => {
    this.languageKey = lngKey;
  };

  public configure = (options: { dictionaries: T; locale?: keyof T }) => {
    this.dictionaries = options.dictionaries as T;
    this.languageKey = (options.locale ||
      this.preferredLanguage ||
      this.fallbackLanguage) as string;

    return this;
  };

  public t = (path: keyof T[keyof T] | string, variables?: { [key: string]: string }) => {
    let result = get(this.dictionaries[this.languageKey], path);

    if (result) {
      return this.injectVariablesIntoString(result, variables || {});
    }

    const fallbackResult = get(this.dictionaries[this.languageKey], path);
    if (fallbackResult) {
      return this.injectVariablesIntoString(fallbackResult, variables || {});
    }

    return `[missing translation] - path: ${path}`;
  };

  //#region Utils
  private injectVariablesIntoString = (str: string, vars: { [key: string]: string }) => {
    let result = str;

    Object.keys(vars).forEach((variable) => {
      result = result.replace(`{{${variable}}}`, vars[variable]);
    });

    return result;
  };
  //#endregion
}

export default I18n;
