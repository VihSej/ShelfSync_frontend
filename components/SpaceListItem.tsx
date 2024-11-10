import { View, StyleSheet, Text, Image } from "react-native";

interface SpaceListItemProps {
  name: string;
  img?: string;
}

export default function SpaceListItem({ name, img }: SpaceListItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 30, // Space between image and text
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  text: {
    fontSize: 18,
  },
});
