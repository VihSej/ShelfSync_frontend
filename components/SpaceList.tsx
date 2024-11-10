import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useSpaceNavigation } from "../hooks/useSpaceNavigation";
import SpaceListMenu from "./SpaceListMenu";

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

  const { spaces, subSpaces, isLoading } = useSpaceNavigation(shouldRender);

  if (!shouldRender) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />

      <SpaceListMenu
        slideAnim={slideAnim}
        isLoading={isLoading}
        spaces={spaces}
        subSpaces={subSpaces}
        onClose={onClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
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
