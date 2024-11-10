import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "darkcyan",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "My Account",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Icon name="arrow-back" color="white" size={35} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text>Profile Name</Text>
        <Text>Profile Picture</Text>
        <Text>Profile email</Text>
        <Text>Edit profile options</Text>
        <Text>Sign Out</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginLeft: 10,
  },
  headerRight: {
    marginRight: 10,
  },
});
