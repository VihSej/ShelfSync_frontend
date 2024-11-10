import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

interface ThingsListCardProps {
  name: string;
  description?: string;
  image?: string; // Public URL of the image
}

const ThingsListCard: React.FC<ThingsListCardProps> = ({ name, description, image }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Manage image loading state
  const [hasError, setHasError] = useState<boolean>(false); // Track image load errors

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {image && !hasError ? (
        <View style={styles.imageContainer}>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="#007bff"
              style={styles.imageLoader}
            />
          )}
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false); // Hide the spinner
            }}
          />
        </View>
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Arrange text and image horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: "white",
    padding: 16,
    height: 150,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textContainer: {
    flex: 1, // Ensures the text takes up remaining horizontal space
    paddingRight: 16, // Add space between text and image
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  imageContainer: {
    position: "relative", // Position loader over the image
    width: 80,
    height: 120,
    borderRadius: 8,
    overflow: "hidden", // Ensures loader stays within the image bounds
  },
  imageLoader: {
    position: "absolute", // Center loader over the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8, // Optional rounded corners
  },
  imagePlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: "#e0e0e0", // Placeholder color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: "#888",
  },
});

export default ThingsListCard;
