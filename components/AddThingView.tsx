import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "@rneui/themed"; // Import the Input component

interface AddThingViewProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: { name: string; description: string }) => void; // Update onConfirm to include name and description
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
  const [inputText, setInputText] = useState(""); // State for item name
  const [descriptionText, setDescriptionText] = useState(""); // State for item description
  const [error, setError] = useState<string | undefined>(undefined); // State for error message

  // Centralized close logic
  const handleClose = () => {
    setError(undefined); // Reset error message
    setInputText(""); // Clear item name
    setDescriptionText(""); // Clear description
    onClose(); // Trigger onClose prop
  };

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

  const handleConfirm = () => {
    if (!inputText.trim()) {
      setError("Item Name is required"); // Show error if input is empty
      return;
    }
    setError(undefined); // Clear error on valid input
    onConfirm({ name: inputText, description: descriptionText }); // Pass name and description to onConfirm
    handleClose(); // Reset and close the view
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.overlay}>
        {/* Backdrop to close the view */}
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleClose} // Centralized close logic
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
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Item Name Label */}
            <Text style={styles.inputLabel}>Item Name</Text>
            {/* Item Name Input */}
            <Input
              placeholder="Enter item name here"
              value={inputText}
              onChangeText={setInputText} // Update state with input text
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorMessage={error} // Display error message if any
              errorStyle={styles.errorText}
            />

            {/* Description Label */}
            <Text style={styles.inputLabel}>Item Description (Optional)</Text>
            {/* Description Input */}
            <Input
              placeholder="Enter item description here"
              value={descriptionText}
              onChangeText={setDescriptionText} // Update state with description text
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
            />

            {/* Add Item Bar */}
            
            <TouchableOpacity style={styles.addItemBar} onPress={handleConfirm}>
              <Text style={styles.addItemBarText}>Add Item</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 18,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    position: "relative",
    paddingHorizontal: 0,
  },
  inputLabel: {
    fontSize: 16, // Consistent and readable size
    color: "#333", // Neutral color for accessibility
    marginTop: 20,
    marginBottom: 10, // Space between the label and the input
    fontWeight: "500", // Slightly bold for emphasis
  },
  inputStyle: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  addItemBar: {
    position: "absolute", // Stick to the bottom of the screen
    bottom: 80, // Align to the screen bottom
    left: 0,
    right: 0,
    height: 90, // Height of the bar
    paddingBottom: 13,
    backgroundColor: "green", // Bar background color
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Slight shadow for better visibility
  },
  addItemBarText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
});
