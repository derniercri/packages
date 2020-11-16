import React from "react";
import { Text, View } from "react-native";

import i18n from "./i18n";

const App = () => (
  <View style={{ marginTop: 96 }}>
    <Text>{i18n.t("hello-world")}</Text>
  </View>
);

export default App;
