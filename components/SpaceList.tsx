import { Icon } from "@rneui/base";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import SpaceListItem from "./SpaceListItem";
import fetchSpace from "../services/fetchSpace";
import Loading from "./Loading";
import fetchUser from "../services/fetchUser";

interface SpaceListProps {
  visible: boolean;
  onClose: () => void;
}
interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
}
interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  universe: string;
}
const SPACELIST_WIDTH = 300;
export default function SpaceList({ visible, onClose }: SpaceListProps) {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const [shouldRender, setShouldRender] = useState(visible);
  const [spaces, setSpaces] = useState<Space>();
  const [user, setUser] = useState<User>();
  const [subSpaces, setSubSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (shouldRender) {
        setIsLoading(true);
        try {
          await fetchUser(setUser);
        } catch (err) {
          console.error("Error fetching user:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserData();
  }, [shouldRender]);

  useEffect(() => {
    const fetchSpaceData = async () => {
      if (user?.universe) {
        setIsLoading(true);
        try {
          await fetchSpace(user.universe, setSpaces);
        } catch (err) {
          console.error("Error fetching space:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSpaceData();
  }, [user]);

  useEffect(() => {
    const fetchSubSpaces = async () => {
      if (!spaces?.subSpaces.length) return;

      setIsLoading(true);
      try {
        const fetchedSubSpaces = await Promise.all(
          spaces.subSpaces.map((subSpaceId) => fetchSpace(subSpaceId))
        );

        // Filter out any null results from failed fetches
        const validSubSpaces = fetchedSubSpaces.filter(
          (space): space is Space => space !== null && space !== undefined
        );

        setSubSpaces(validSubSpaces);
      } catch (err) {
        console.error("Error fetching subspaces:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubSpaces();
  }, [spaces]);

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
        {isLoading && <Loading />}
        {!isLoading && (
          <TouchableOpacity style={styles.parentSpace} activeOpacity={0.5}>
            <Text style={styles.parentName}>{spaces?.name}</Text>
          </TouchableOpacity>
        )}
        {!isLoading &&
          subSpaces.map((item) => (
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.5}
              key={item._id}
            >
              <SpaceListItem name={item.name} key={item._id} />
            </TouchableOpacity>
          ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentSpace: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  parentName: {
    // New style for parent name
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    letterSpacing: 0.5,
  },
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
