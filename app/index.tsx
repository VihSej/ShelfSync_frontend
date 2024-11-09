import AddThingButton from "@/components/AddThingButton";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SpaceList from "@/components/SpaceList";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSpacesVisible, setSpacesVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        onPressMenu={setMenuVisible}
        onPressSpaceList={setSpacesVisible}
      />
      <Menu
        visible={isMenuVisible}
        onClose={() => {
          setMenuVisible(false);
          setSpacesVisible(false);
        }}
      />
      <SpaceList
        visible={isSpacesVisible}
        onClose={() => {
          setMenuVisible(false);
          setSpacesVisible(false);
        }}
      />
      <View style={styles.internalContainer}></View>
      <AddThingButton />
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
