import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Animated,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

interface QRCodeScannerProps {
  onQRCodeScanned: (data: string) => void;
  onClose: () => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onQRCodeScanned, onClose }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Type: ${type}\nData: ${data}`);
    onQRCodeScanned(data);
    onClose();
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
    <Animated.View style={[styles.overlay, { opacity: slideAnim }]}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} // Restrict to QR codes
        />
        {scanned && (
          <View style={styles.scanAgainButton}>
            <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
          </View>
        )}
        <View style={styles.closeButton}>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Animated.View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  scannerContainer: {
    height: "84%", // Adjust scanner height
    backgroundColor: "black",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
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
  scanAgainButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
  },
});

export default QRCodeScanner;
