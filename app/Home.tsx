import { useState } from "react";
import AddThingButton from "@/components/AddThingButton";
import AddThingView from "@/components/AddThingView";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SpaceList from "@/components/SpaceList";
import { View, StyleSheet } from "react-native";

export default function Home() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSpacesVisible, setSpacesVisible] = useState(false);
  const [isAddThingVisible, setAddThingVisible] = useState(false);
  const [currentSpace, setCurrentSpace] = useState("");
  const [shouldRender, setShouldRender] = useState(isSpacesVisible);

  return (
    <View style={styles.container}>
      <Header
        onPressMenu={setMenuVisible}
        onPressSpaceList={setSpacesVisible}
        currentSpace={currentSpace}
        shouldRender={shouldRender}
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
        currentSpace={currentSpace}
        setCurrentSpace={setCurrentSpace}
        shouldRender={shouldRender}
        setShouldRender={setShouldRender}
      />
      <View style={styles.internalContainer}></View>
      <AddThingView
        visible={isAddThingVisible}
        onClose={() => setAddThingVisible(false)}
        onConfirm={() => {
          setAddThingVisible(false);
          console.log("New thing added!");
        }}
      />
      <AddThingButton onPress={() => setAddThingVisible(true)} />
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
