import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Header as HeaderRNE } from "@rneui/themed";
import { Icon } from "@rneui/base";

export default function Header({
  onPressMenu,
}: {
  onPressMenu: (value: boolean) => void;
}) {
  return (
    <View style={styles.container}>
      <HeaderRNE
        backgroundColor="darkcyan"
        elevated={false}
        leftComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => onPressMenu(true)}>
              <Icon name="menu" color="white" size={35} />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon name="account-circle" color="white" size={35} />
            </TouchableOpacity>
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
    marginTop: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  dropdown: {
    position: "absolute", // Position the dropdown relative to the header
    top: 70, // Adjust to position below the header
    left: 10, // Optional: Add padding to align dropdown
    right: 10,
    zIndex: 1000, // Ensure it appears on top
  },
});
