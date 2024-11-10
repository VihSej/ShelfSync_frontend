import AddThingButton from "@/components/AddThingButton";
import AddThingView from "@/components/AddThingView";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SpaceList from "@/components/SpaceList";
import { isLoggedIn } from "@/services/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {

  const router = useRouter();
  useEffect(() => {(async () => { 
    if (!(await isLoggedIn()))
      router.push("/login");
  })()}, []);

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSpacesVisible, setSpacesVisible] = useState(false);
  const [isAddThingVisible, setAddThingVisible] = useState(false);

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
      <AddThingView
        visible={isAddThingVisible}
          onClose={() => setAddThingVisible(false)}
          onConfirm={() => {
            setAddThingVisible(false);
            console.log("New thing added!");
        }}
      />

      {/* AddThingButton */}
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
