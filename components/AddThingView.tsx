import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Input } from '@rneui/themed';

interface AddThingViewProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = 90; // Match the height of your Header

export default function AddThingView({
  visible,
  onClose,
  onConfirm,
}: AddThingViewProps) {
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true); // Render component when visible
    }
    Animated.timing(slideAnim, {
      toValue: visible ? HEADER_HEIGHT : SCREEN_HEIGHT, // Animate to just below the header
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) {
        setShouldRender(false); // Hide after animation completes
      }
    });
  }, [visible]);

  if (!shouldRender) return null; // Don't render when hidden

  return (
    <View style={styles.overlay}>
      {/* Backdrop to close the view */}
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      {/* Animated sliding panel */}
      <Animated.View
  style={[
    styles.container,
    {
      transform: [{ translateY: slideAnim }],
    },
  ]}
>
  {/* Close button */}
  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
    <Text style={styles.closeButtonText}>✕</Text>
  </TouchableOpacity>

  {/* Add Item Bar */}
  <TouchableOpacity style={styles.addItemBar} onPress={onConfirm}>
    <Text style={styles.addItemBarText}>Add Item</Text>
  </TouchableOpacity>
</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Shorthand for absolute positioning
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent backdrop
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0, // Start from the bottom of the screen
    top: HEADER_HEIGHT, // Slide up to just below the header
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 15,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 40, // Space under the close button
    textAlign: "center",
  },
  addItemBar: {
    position: "absolute", // Stick to the bottom of the screen
    bottom: 80, // Align to the screen bottom
    left: 0,
    right: 0,
    height: 90, // Height of the bar
    backgroundColor: "green", // Bar background color
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Slight shadow for better visibility
    paddingBottom: 15
  },
  addItemBarText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
});
