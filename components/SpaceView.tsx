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
  Alert,
} from "react-native";
import { Icon } from "@rneui/base";
// import QRCODE from "./QRCODE";
// import deleteSpace from "../services/deleteSpace";

interface SpaceViewProps {
  visible: boolean;
  onClose: () => void;
  onDelete?: () => void;
  space: {
    name: string;
    _id: string;
    description?: string;
    image?: string;
  } | undefined;
}

const SpaceView: React.FC<SpaceViewProps> = ({
  visible,
  onClose,
  space,
}) => {
  if (!space) return null;

  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [hasImageError, setHasImageError] = React.useState(false);

  const onDelete = async () => {
    // await deleteSpace(space._id)
    onClose();
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${space.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ]
    );
  };

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
            {space.image && !hasImageError ? (
              <View style={styles.imageContainer}>
                {isImageLoading && (
                  <ActivityIndicator
                    size="large"
                    color="#007bff"
                    style={styles.imageLoader}
                  />
                )}
                <Image
                  source={{ uri: space.image }}
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
              <Text style={styles.name}>{space.name}</Text>
              {space.description && (
                <Text style={styles.description}>{space.description}</Text>
              )}
            </View>

            {/* <View style={styles.qrContainer}>
              <QRCODE
                value={thing._id}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </View> */}
          </ScrollView>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Icon name="delete" color="white" size={24} />
              <Text style={styles.deleteButtonText}>Delete Space</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
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
  qrContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 80, // Added space for bottom bar
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default SpaceView;
