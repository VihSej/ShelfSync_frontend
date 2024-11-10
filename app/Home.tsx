import { useEffect, useState } from "react";
import AddThingButton from "@/components/AddThingButton";
import AddThingView from "@/components/AddThingView";
import AddSpaceView from "@/components/AddSpaceView";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SpaceList from "@/components/SpaceList";
import { View, StyleSheet } from "react-native";

import { useUser } from "@/hooks/useUser";

import ThingsList from "@/components/ThingsList";

interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
}

export default function Home() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSpacesVisible, setSpacesVisible] = useState(true);
  const [isAddSpaceVisible, setAddSpaceVisible] = useState(false);
  const [isAddThingVisible, setAddThingVisible] = useState(false);
  const [currentSpace, setCurrentSpace] = useState("");
  const [shouldRender, setShouldRender] = useState(isSpacesVisible);
  const user = useUser();

  useEffect(() => {
    if (user?.universe) {
      setCurrentSpace(user.universe);
    }
  }, [user]);

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
        setAddSpaceVisible={setAddSpaceVisible}
      />
      <AddSpaceView
        visible={isAddSpaceVisible}
        onClose={() => setAddSpaceVisible(false)}
        onConfirm={() => {
          setAddSpaceVisible(false);
          console.log("New space added!");
        }}
        currentSpace={currentSpace}
      />
      <View style={styles.content}>
        <ThingsList spaceId={currentSpace} />
      </View>
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
    flex: 1, // Ensures Home fills the screen
  },
  content: {
    flex: 1, // Ensures ThingsList takes up remaining space
    backgroundColor: "white",
  },
});
