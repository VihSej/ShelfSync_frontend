import { useEffect, useState } from "react";
import AddThingButton from "@/components/AddThingButton";
import AddThingView from "@/components/AddThingView";
import AddSpaceView from "@/components/AddSpaceView";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import SpaceList from "@/components/SpaceList";
import QRCodeScanner from "@/components/QRCodeScanner";
import ThingView from "@/components/ThingView"; // Import ThingView
// import Toast from "react-native-toast-message"; // Toast library
import { View, StyleSheet } from "react-native";
import { useUser } from "@/hooks/useUser";
import ThingsList from "@/components/ThingsList";
import SpaceView from "@/components/SpaceView";

export default function Home() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSpacesVisible, setSpacesVisible] = useState(true);
  const [isAddSpaceVisible, setAddSpaceVisible] = useState(false);
  const [isAddThingVisible, setAddThingVisible] = useState(false);
  const [isScannerVisible, setScannerVisible] = useState(false); // State for QR scanner
  const [isThingViewVisible, setThingViewVisible] = useState(false); // State for ThingView
  const [currentSpace, setCurrentSpace] = useState("");
  const [selectedThing, setSelectedThing] = useState(null); // Selected Thing for ThingView
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Trigger for ThingsList refresh
  const [spaceRefresh, setSpaceRefresh] = useState(false); // Trigger for Space
  const user = useUser();

  useEffect(() => {
    if (user?.universe) {
      setCurrentSpace(user.universe);
    }
  }, [user]);

  const handleQRCodeScanned = (thing: any) => {
    setSelectedThing(thing);
    setScannerVisible(false);
    setThingViewVisible(true);
  };
 
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        onPressMenu={setMenuVisible}
        onPressSpaceList={setSpacesVisible}
        onPressQRCode={() => setScannerVisible(true)} // Show QR scanner
        currentSpace={currentSpace}
        shouldRender={isSpacesVisible} // Pass `shouldRender` prop
      />

      {/* Main Content */}
      <View style={styles.content}>
        <ThingsList
          spaceId={currentSpace}
          refreshTrigger={refreshTrigger} // Pass refresh trigger
          setRefreshTrigger={setRefreshTrigger} // Pass refresh setter
        />
      </View>

      {/* QRCodeScanner Overlay */}
      {isScannerVisible && (
        <View style={styles.qrScannerOverlay}>
          <QRCodeScanner
            onQRCodeScanned={handleQRCodeScanned} // Handle successful scan
            onClose={() => setScannerVisible(false)}
          />
        </View>
      )}

      {/* ThingView Modal */}
      {selectedThing && (
        <ThingView
        visible={isThingViewVisible}
        thing={selectedThing}
        onClose={() => {
          setThingViewVisible(false);
          setSelectedThing(null);
        }}
      />
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
        shouldRender={isSpacesVisible}
        setShouldRender={setSpacesVisible}
        setAddSpaceVisible={setAddSpaceVisible}
        spaceRefresh={spaceRefresh}
      />
      <AddSpaceView
        visible={isAddSpaceVisible}
        onClose={() => setAddSpaceVisible(false)}
        onConfirm={() => {
          setAddSpaceVisible(false);
          console.log("New space added!");
          setSpaceRefresh((prev) => !prev);
        }}
        currentSpace={currentSpace}
      />

      <AddThingView
        visible={isAddThingVisible}
        onClose={() => setAddThingVisible(false)}
        onConfirm={() => {
          setAddThingVisible(false);
          console.log("New thing added!");
          setRefreshTrigger((prev) => !prev); // Toggle trigger to refresh ThingsList
        }}
        currentSpace={currentSpace}
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
