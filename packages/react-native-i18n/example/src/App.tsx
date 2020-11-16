import React from "react";
import { Text, View } from "react-native";

import i18n from "./i18n";

const App = () => (
  <View style={{ marginTop: 96 }}>
    <Text>{i18n.t("hello-world")}</Text>
    <Text>{i18n.t("nested.hey-buddy")}</Text>
    <Text>{i18n.t("nested.not-exist")}</Text>
  </View>
);

export default App;
