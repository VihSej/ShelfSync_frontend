import CreateNewSpace from "@/components/CreateNewSpace";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header onPressMenu={setMenuVisible} />
      <Menu visible={isMenuVisible} onClose={() => setMenuVisible(false)} />
      <View style={styles.internalContainer}></View>
      <CreateNewSpace />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
  internalContainer: {
    backgroundColor: "white",
    flex: 1,
  },
});
