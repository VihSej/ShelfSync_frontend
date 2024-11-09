import { Icon } from "@rneui/base";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function AddThingButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Pressed!");
      }}
      activeOpacity={0.7}
    >
      <View style={styles.ViewStyles}>
        <Icon type="material-community" name="plus" color="white" size={50} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ViewStyles: {
    height: 70,
    width: 70,
    backgroundColor: "darkcyan",
    borderRadius: 100,
    marginLeft: 30,
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
});
