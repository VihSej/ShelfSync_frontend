import { Icon } from "@rneui/base";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface AddThingButtonProps {
  onPress: () => void;
}

export default function AddThingButton({ onPress }: AddThingButtonProps) {
  return (
    <TouchableOpacity style={styles.ViewStyles} onPress={onPress} activeOpacity={0.7}>
        <Icon type="material-community" name="plus" color="white" size={50} />
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
