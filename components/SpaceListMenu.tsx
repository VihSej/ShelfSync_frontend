import { Icon } from "@rneui/base";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Loading from "./Loading";
import SpaceListItem from "./SpaceListItem";
import { useUser } from "@/hooks/useUser";
import React from "react";

interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
  image?: string;
}

interface SpaceListMenuProps {
  slideAnim: Animated.Value;
  isLoading: boolean;
  spaces?: Space;
  subSpaces: Space[] | undefined;
  onClose: () => void;
  currentSpace: string;
  setCurrentSpace: (value: string) => void;
  setAddSpaceVisible: (value: boolean) => void;
  setIsSpaceInfoVisible: (value: boolean) => void;
}

const SPACELIST_WIDTH = 300;

export default function SpaceListMenu({
  slideAnim,
  isLoading,
  spaces,
  subSpaces,
  onClose,
  currentSpace,
  setCurrentSpace,
  setAddSpaceVisible,
  setIsSpaceInfoVisible,
}: SpaceListMenuProps) {
  const user = useUser();

  const animateOut = () => {
    Animated.timing(slideAnim, {
      toValue: -SPACELIST_WIDTH, // Move out of view
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose(); // Trigger the external onClose callback after animation
    });
  };

  const handleCreateButton = () => {
    setAddSpaceVisible(true);
  };

  const handleHomeButton = () => {
    if (user?.universe) setCurrentSpace(user.universe);
  };

  const handleInfoPress = () => {
    setIsSpaceInfoVisible(true);
  }

  const renderSpaceItem = ({ item }: { item: Space }) => (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.5}
      onPress={() => {
        if (item?._id) {
          setCurrentSpace(item._id);
        }
      }}
    >
      <SpaceListItem name={item.name} img={item.image} />
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={animateOut}>
      <KeyboardAvoidingView style={styles.outerContainer} behavior="padding">
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={animateOut} // Close with animation
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleCreateButton}
              activeOpacity={0.7}
            >
              <Icon name="add" color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleHomeButton}
              activeOpacity={0.7}
            >
              <Icon name="home" color="white" />
            </TouchableOpacity>
          </View>

          {isLoading && <Loading />}

          {!isLoading && (
            <TouchableOpacity style={styles.parentSpace} activeOpacity={0.5} onPress={handleInfoPress}>
              <Text style={styles.parentName}>{spaces?.name}</Text>
              <Icon name="info" color="blue" />
            </TouchableOpacity>
          )}

          {!isLoading && (
            <FlatList
              data={subSpaces}
              renderItem={renderSpaceItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContent}
            />
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: dim background when menu is open
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 30,
  },
  parentSpace: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  parentName: {
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
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 20,
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
  listContent: {
    paddingBottom: 10,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
