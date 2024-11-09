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
  onConfirm: (text: string) => void; // Update onConfirm to include input text
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
  const [inputText, setInputText] = useState(""); // State for input field

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Input Field Label Text: */}
            <Text style={styles.inputLabel}>Item Name</Text>
            {/* Input Field */}
            <Input
              placeholder="Enter item name here"
              value={inputText}
              onChangeText={setInputText} // Update state with input text
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
            />

            {/* Add Item Bar */}
            <TouchableOpacity
              style={styles.addItemBar}
              onPress={() => onConfirm(inputText)} // Pass the input text to onConfirm
            >
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
  inputContainer: {
    position: "relative",
    paddingHorizontal: 0
  },
  inputLabel: {
    fontSize: 16, // Consistent and readable size
    color: "#333", // Neutral color for accessibility
    marginTop: 40,
    marginBottom: 10, // Space between the label and the input
    fontWeight: "500", // Slightly bold for emphasis
  },
  inputInnerContainer: {
    paddingHorizontal: 0, // Match label's padding for alignment
  },
  inputStyle: {
    fontSize: 16,
    color: "#333",
  },
  addItemBar: {
    position: "absolute", // Stick to the bottom of the screen
    borderRadius: 15,
    bottom: 100, // Align to the screen bottom
    left: 0,
    right: 0,
    height: 70, // Height of the bar
    backgroundColor: "green", // Bar background color
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Slight shadow for better visibility
  },
  addItemBarText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  } 
});
