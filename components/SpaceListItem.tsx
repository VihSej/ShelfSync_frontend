import { View, StyleSheet, Text, Image } from "react-native";

interface SpaceListItemProps {
  name: string;
  img?: string; // Optional image URL
}

export default function SpaceListItem({ name, img }: SpaceListItemProps) {
  const placeholderImg = "https://www.nicepng.com/png/detail/505-5051331_location-icon-teal.png"; // Online placeholder image

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: img || placeholderImg }} // Fallback to placeholder if img is undefined
        style={styles.image}
      />
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
