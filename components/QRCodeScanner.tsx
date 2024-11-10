import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import fetchItem from "../services/fetchThing"; // Import the new fetchItem service
import ThingView from "@/components/ThingView"; // Import ThingView to display item details

interface QRCodeScannerProps {
  onQRCodeScanned: (data: string) => void;
  onClose: () => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onQRCodeScanned, onClose }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedThing, setFetchedThing] = useState<any | null>(null); // Stores fetched item data
  const [fetchError, setFetchError] = useState<string | null>(null); // Error message for fetching

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        Alert.alert("Error", "Failed to request camera permissions.");
        setHasPermission(false);
      }
    };

    getBarCodeScannerPermissions();

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLoading(true);
    setFetchError(null);

    try {
      // Fetch the item using the scanned data (ID)
      const item = await fetchItem(data);

      if (!item) {
        setFetchError("No item found for the scanned QR code.");
      } else {
        setFetchedThing(item);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      setFetchError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryScan = () => {
    setScanned(false); // Reset scanned state to allow scanning again
    setFetchError(null); // Clear any previous errors
    setFetchedThing(null); // Clear fetched item if any
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centeredView}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centeredView}>
        <Text>No access to camera</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    );
  }

  return (
    <>
      <Animated.View style={[styles.overlay, { opacity: slideAnim }]}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.scannerContainer}>
          {!scanned ? (
            <>
              {/* Scanner View */}
              <BarCodeScanner
                onBarCodeScanned={handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} // Restrict to QR codes
              />
              <View style={styles.closeButton}>
                <Button title="Close" onPress={onClose} />
              </View>
            </>
          ) : loading ? (
            // Loader while fetching data
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007bff" />
              <Text style={styles.loadingText}>Fetching item...</Text>
            </View>
          ) : fetchError ? (
            // Error message if fetching fails
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{fetchError}</Text>
              <Button title="Try Again" onPress={handleRetryScan} />
            </View>
          ) : (
            // If the item is fetched successfully, open ThingView
            fetchedThing && (
              <ThingView
                visible={!!fetchedThing}
                thing={fetchedThing}
                onClose={() => {
                  setFetchedThing(null); // Clear item when ThingView closes
                  handleRetryScan(); // Reset scanner for another use
                }}
              />
            )
          )}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scannerContainer: {
    height: "84%", // Adjust scanner height
    backgroundColor: "black",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "white",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default QRCodeScanner;
