import { useEffect, useState } from "react";
import AddThingButton from "@/components/AddThingButton";
import AddThingView from "@/components/AddThingView";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SpaceList from "@/components/SpaceList";
import QRCodeScanner from "@/components/QRCodeScanner";
import { View, StyleSheet, Alert } from "react-native";

import { useUser } from "@/hooks/useUser";
import ThingsList from "@/components/ThingsList";

export default function Home() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSpacesVisible, setSpacesVisible] = useState(true);
  const [isAddThingVisible, setAddThingVisible] = useState(false);
  const [isScannerVisible, setScannerVisible] = useState(false); // State for QR scanner
  const [currentSpace, setCurrentSpace] = useState("");
  const [shouldRender, setShouldRender] = useState(isSpacesVisible);
  const user = useUser();

  useEffect(() => {
    if (user?.universe) {
      setCurrentSpace(user.universe);
    }
  }, [user]);

  const handleQRCodeScanned = (data: string) => {
    Alert.alert("QR Code Scanned", `Scanned Data: ${data}`);
    setScannerVisible(false); // Only toggles scanner visibility
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        onPressMenu={setMenuVisible}
        onPressSpaceList={setSpacesVisible}
        onPressQRCode={() => setScannerVisible(true)} // Show QR scanner
        currentSpace={currentSpace}
        shouldRender={shouldRender}
      />

      {/* Main Content */}
      <View style={styles.content}>
        <ThingsList spaceId={currentSpace} />
      </View>

      {/* QRCodeScanner Overlay */}
      {isScannerVisible && (
        <View style={styles.qrScannerOverlay}>
          <QRCodeScanner
            onQRCodeScanned={handleQRCodeScanned}
            onClose={() => setScannerVisible(false)}
          />
        </View>
      )}

      {/* Modals and Overlays */}
      <Menu
        visible={isMenuVisible}
        onClose={() => {
          setMenuVisible(false);
          setSpacesVisible(false);
        }}
      />
      <SpaceList
        visible={isSpacesVisible}
        onClose={() => {
          setMenuVisible(false);
          setSpacesVisible(false);
        }}
        currentSpace={currentSpace}
        setCurrentSpace={setCurrentSpace}
        shouldRender={shouldRender}
        setShouldRender={setShouldRender}
      />
      <AddThingView
        visible={isAddThingVisible}
        onClose={() => setAddThingVisible(false)}
        onConfirm={() => {
          setAddThingVisible(false);
          console.log("New thing added!");
        }}
      />
      <AddThingButton onPress={() => setAddThingVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures Home fills the screen
  },
  content: {
    flex: 1, // Allows the main content to take up remaining space below the header
    backgroundColor: "white",
  },
  qrScannerOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    zIndex: 1000, // Ensures it appears above other components
  },
});
