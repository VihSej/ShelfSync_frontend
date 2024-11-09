import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Header as HeaderRNE } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { useRouter } from "expo-router";

interface HeaderProps {
  onPressMenu: (value: boolean) => void;
  onPressSpaceList: (value: boolean) => void;
}

export default function Header({ onPressMenu, onPressSpaceList }: HeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <HeaderRNE
        backgroundColor="darkcyan"
        elevated={false}
        leftComponent={
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon
                name="explore"
                color="white"
                size={35}
                onPress={() => {
                  onPressMenu(false);
                  onPressSpaceList(true);
                }}
              />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View style={styles.header}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  onPressSpaceList(false);
                  onPressMenu(true);
                }}
              >
                <Icon name="menu" color="white" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        centerComponent={{ text: "Universe", style: styles.heading }}
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
    marginTop: 0,
  },
  dropdown: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
});
