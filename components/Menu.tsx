import { Icon } from "@rneui/base";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";

interface MenuProps {
  visible: boolean;
  onClose: () => void;
}
const MENU_WIDTH = 300;
export default function Menu({ visible, onClose }: MenuProps) {
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = React.useRef(new Animated.Value(screenWidth)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
    Animated.timing(slideAnim, {
      toValue: visible ? screenWidth - MENU_WIDTH : screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) {
        setShouldRender(false);
      }
    });
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Icon name="arrow-forward" color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.5}>
          <Text style={styles.menuText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.5}>
          <Text style={styles.menuText}>Pinned Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.5}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login")} style={styles.menuItem} activeOpacity={0.5}>
          <Text style={styles.menuText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 50,
    width: 50,
    backgroundColor: "darkcyan",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: "white",
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
