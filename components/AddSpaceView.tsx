import React, { useState, useEffect } from "react";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  Linking,
} from "react-native";
import MapView, { Polygon, Marker } from 'react-native-maps';
import { Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { addSpace } from "@/services/addSpace";

interface AddThingViewProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: { name: string; description: string; image: string | null }) => void;
  currentSpace: string;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = 90;

export default function AddThingView({
  visible,
  onClose,
  onConfirm,
  currentSpace,
}: AddThingViewProps) {
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [shouldRender, setShouldRender] = useState(visible);
  const [inputText, setInputText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [rectangleCoords, setRectangleCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [drawing, setDrawing] = useState(false);

  const handleClose = () => {
    setError(undefined);
    setInputText("");
    setDescriptionText("");
    setSelectedImage(null);
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
    Animated.timing(slideAnim, {
      toValue: visible ? HEADER_HEIGHT : SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) {
        setShouldRender(false);
      }
    });
  }, [visible]);

  if (!shouldRender) return null;

  const handleConfirm = async () => {
    if (!inputText.trim()) {
      setError("Item Name is required");
      return;
    }
  
    setError(undefined);
  
    // Construct the data object with null fallback for undefined values
    const data = {
      name: inputText,
      description: descriptionText ?? null, // Use null if descriptionText is undefined
      superSpace: currentSpace, // Hard coded universe id for now
      coords1: [4,5],
      coords2: [6,7],
      image: selectedImage ?? null, // Use null if selectedImage is undefined
    };
  
    try {
      const result = await addSpace(data); // Call the addThing function
      Alert.alert("Success", "Item added successfully!");
  
      onConfirm({
        name: inputText,
        description: descriptionText,
        image: selectedImage,
      });
  
      handleClose();
    } catch (error: any) {
      console.error("Error adding data:", error);
      Alert.alert("Error", "Failed to add item.");
    }
  };
  

  const requestPermission = async (
    permissionRequest: () => Promise<ImagePicker.PermissionResponse>,
    permissionType: string
  ): Promise<boolean> => {
    const { status, canAskAgain } = await permissionRequest();
    if (status === "granted") {
      return true;
    } else if (!canAskAgain) {
      Alert.alert(
        "Permission Denied",
        `Please enable ${permissionType} permissions in your device settings.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    } else {
      return false;
    }
  };

  const handleLaunchCamera = async () => {
    const hasPermission = await requestPermission(
      ImagePicker.requestCameraPermissionsAsync,
      "camera"
    );
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleLaunchLibrary = async () => {
    const hasPermission = await requestPermission(
      ImagePicker.requestMediaLibraryPermissionsAsync,
      "photo library"
    );
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={handleClose} activeOpacity={1} />
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Space Name</Text>
            <Input
              placeholder="Enter space name here"
              value={inputText}
              onChangeText={setInputText}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errorMessage={error}
              errorStyle={styles.errorText}
            />

            <Text style={styles.inputLabel}>Space Description (Optional)</Text>
            <Input
              placeholder="Enter space description here"
              value={descriptionText}
              onChangeText={setDescriptionText}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
            />

            <Text style={styles.inputLabel}>Upload Space Image</Text>
            <View style={styles.imageContainer}>
              {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}
              <View style={styles.imageButtons}>
                <TouchableOpacity style={styles.imageButton} onPress={handleLaunchCamera}>
                  <Text style={styles.imageButtonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={handleLaunchLibrary}>
                  <Text style={styles.imageButtonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 20 }} />

            <Text style={styles.inputLabel}>Choose Location</Text>
            <Input
              placeholder="Enter Location"
              // value={descriptionText}
              // onChangeText={setDescriptionText}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
            />
            <MapView style={styles.map} />

            <TouchableOpacity style={styles.addItemBar} onPress={handleConfirm}>
              <Text style={styles.addItemBarText}>Add Space</Text>
            </TouchableOpacity>
            <View style={{ height: 100 }} />
            
          </ScrollView>
        </Animated.View>
      </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  map0: {
    height: 500,
  },
  map: {
    // marginTop: 50,
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 1000 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: HEADER_HEIGHT,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
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
  closeButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  inputContainer: { paddingHorizontal: 0 },
  inputLabel: { fontSize: 16, color: "#333", marginTop: 20, marginBottom: 10, fontWeight: "500" },
  inputStyle: { fontSize: 16, color: "#333" },
  errorText: { color: "red", fontSize: 14, marginTop: 5 },
  imageContainer: { alignItems: "center" },
  imagePreview: { width: 200, height: 200, borderRadius: 10, marginBottom: 10, marginTop: 20, },
  imageButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  imageButton: { backgroundColor: "green", padding: 10, borderRadius: 8, marginHorizontal: 5 },
  imageButtonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  addItemBar: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // marginTop: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  addItemBarText: { color: "#fff", fontSize: 20, fontWeight: "600", alignSelf: "center", textAlign: "center" },
});
