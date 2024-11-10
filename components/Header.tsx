import React, { useEffect, useState } from "react";
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
  currentSpace: string;
  shouldRender: boolean;
}

interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  universe: string;
}

export default function Header({
  onPressMenu,
  onPressSpaceList,
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
        centerComponent={{ text: space?.name, style: styles.heading }}
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
