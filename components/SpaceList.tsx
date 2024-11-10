import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import SpaceListMenu from "./SpaceListMenu";
import useFetchSpace from "@/hooks/useFetchSpace";

interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
}

interface SpaceListProps {
  visible: boolean;
  onClose: () => void;
  currentSpace: string;
  setCurrentSpace: (value: string) => void;
  shouldRender: boolean;
  setShouldRender: (value: boolean) => void;
  setAddSpaceVisible: (value: boolean) => void;
}

const SPACELIST_WIDTH = 300;
export default function SpaceList({
  visible,
  onClose,
  currentSpace,
  setCurrentSpace,
  shouldRender,
  setShouldRender,
  setAddSpaceVisible,
}: SpaceListProps) {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

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

  const { space: spaces, subSpaces, isLoading } = useFetchSpace(currentSpace);

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
        currentSpace={currentSpace}
        setCurrentSpace={setCurrentSpace}
        setAddSpaceVisible={setAddSpaceVisible}
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
