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
import SpaceListItem from "./SpaceListItem";

interface SpaceListProps {
  visible: boolean;
  onClose: () => void;
}
const SPACELIST_WIDTH = 300;
export default function SpaceList({ visible, onClose }: SpaceListProps) {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -SPACELIST_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) {
        setShouldRender(false);
      }
    });
  }, [visible]);

  //   React.useEffect(() => {
  //     const data = fetch();
  //     console.log(data);
  //   }, [visible]);

  const fetchSpaces = async (userId: string, jwtToken: string) => {
    try {
      const response = await fetch(`http://102.242.533.21/spaces`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        throw new Error("Failed to fetch spaces");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching spaces:", error);
      throw error;
    }
  };

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
          <Icon name="arrow-back" color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.5}>
          <SpaceListItem name="space1" />
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
    alignSelf: "flex-end",
    marginRight: 30,
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
    width: SPACELIST_WIDTH,
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
