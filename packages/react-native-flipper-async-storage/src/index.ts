import { addPlugin } from "react-native-flipper";
import AsyncStorage from "@react-native-community/async-storage";

addPlugin({
  getId() {
    return "ReactNativeAsyncStorageDC";
  },
  async onConnect(connection) {
    const keys = await AsyncStorage.getAllKeys();

    keys.forEach((key) => {
      connection.send("newRow", {
        key,
        content: AsyncStorage.getItem(key),
      });
    });
  },
  onDisconnect() {},
  runInBackground() {
    return true;
  },
});
