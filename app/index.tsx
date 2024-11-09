import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Header as HeaderRNE } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <HeaderRNE
        elevated={true}
        leftComponent={
          <View style={styles.header}>
            <TouchableOpacity>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    // Title of space
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  header: {
    // Navigation bar
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});
