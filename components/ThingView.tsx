import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/base";

interface ThingViewProps {
  visible: boolean;
  onClose: () => void;
  thing: {
    name: string;
    description?: string;
    image?: string;
  } | null;
}

const ThingView: React.FC<ThingViewProps> = ({ visible, onClose, thing }) => {
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [hasImageError, setHasImageError] = React.useState(false);

  if (!thing) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" color="black" size={35} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {thing.image && !hasImageError ? (
              <View style={styles.imageContainer}>
                {isImageLoading && (
                  <ActivityIndicator
                    size="large"
                    color="#007bff"
                    style={styles.imageLoader}
                  />
                )}
                <Image
                  source={{ uri: thing.image }}
                  style={styles.image}
                  resizeMode="cover"
                  onLoadStart={() => setIsImageLoading(true)}
                  onLoadEnd={() => setIsImageLoading(false)}
                  onError={() => {
                    setHasImageError(true);
                    setIsImageLoading(false);
                  }}
                />
              </View>
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>No Image Available</Text>
              </View>
            )}

            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{thing.name}</Text>
              {thing.description && (
                <Text style={styles.description}>{thing.description}</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
    justifyContent: "flex-end", // Makes the modal slide up from bottom
  },
  content: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%", // Takes up 90% of screen height
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

export default ThingView;
