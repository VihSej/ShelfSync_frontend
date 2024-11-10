import { Icon } from "@rneui/base";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import Loading from "./Loading";
import SpaceListItem from "./SpaceListItem";
import { Text } from "react-native";

interface Space {
  _id: string;
  user_id: string;
  name: string;
  coords1: number[];
  coords2: number[];
  subSpaces: string[];
  thingList: string[];
}

interface SpaceListMenuProps {
  slideAnim: Animated.Value;
  isLoading: boolean;
  spaces?: Space;
  subSpaces: Space[] | undefined;
  onClose: () => void;
  setCurrentSpace: (value: string) => void;
}
const SPACELIST_WIDTH = 300;
export default function SpaceListMenu({
  slideAnim,
  isLoading,
  spaces,
  subSpaces,
  onClose,
  setCurrentSpace,
}: SpaceListMenuProps) {
  return (
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
        subSpaces?.length !== 0 &&
        subSpaces?.map((item) => (
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.5}
            key={item._id}
            onPress={() => {
              if (item?._id) {
                setCurrentSpace(item._id);
              }
            }}
          >
            <SpaceListItem name={item.name} key={item._id} />
          </TouchableOpacity>
        ))}
    </Animated.View>
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
});
