import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Header as HeaderRNE } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { useRouter } from "expo-router";
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

interface HeaderProps {
  onPressMenu: (value: boolean) => void;
  onPressSpaceList: (value: boolean) => void;
  onPressQRCode: () => void; // Add QR code press handler
  currentSpace: string;
  shouldRender: boolean;
}

export default function Header({
  onPressMenu,
  onPressSpaceList,
  onPressQRCode, // Use QR code press handler
  currentSpace,
}: HeaderProps) {
  const router = useRouter();
  const { space } = useFetchSpace(currentSpace);

  return (
    <View style={styles.container}>
      <HeaderRNE
        backgroundColor="darkcyan"
        elevated={false}
        leftComponent={
          <View style={styles.header}>
            {/* Explore Icon */}
            <TouchableOpacity
              onPress={() => {
                onPressMenu(false);
                onPressSpaceList(true);
              }}
              style={styles.iconContainer}
            >
              <Icon name="explore" color="white" size={35} />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View style={styles.header}>
            {/* QR Code Icon */}
            <TouchableOpacity onPress={onPressQRCode} style={styles.iconContainer}>
              <Icon name="qr-code-outline" type="ionicon" color="white" size={30} />
            </TouchableOpacity>
            {/* Menu Icon */}
            <TouchableOpacity
              onPress={() => {
                onPressSpaceList(false);
                onPressMenu(true);
              }}
              style={styles.iconContainer}
            >
              <Icon name="menu" color="white" size={35} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: space?.name || "No Space Selected", style: styles.heading }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  heading: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 5, // Add spacing between icons
  },
});
