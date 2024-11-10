import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { Icon, Avatar } from "@rneui/base";
import { TouchableOpacity } from "react-native";
import { Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import fetchUser from "../services/fetchUser";


export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState({ name: "", email: "" });
  useEffect(() => { fetchUser(setUser) }, []);

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

      {/* Profile content */}
      <View style={styles.container}>

        <Avatar
          size="xlarge"
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={styles.picture}
        />

        <Text style={styles.label}>Name</Text>
        <Input
          value={user.name}
          editable={false}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
        />

        <Text style={styles.label}>Email</Text>
        <Input
          value={user.email}
          editable={false}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
        />

        {/* <Text>Edit profile options</Text> */}
        {/* <Text>Sign Out</Text> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  picture: {
    backgroundColor: 'gray', 
    margin: 50, 
    alignSelf: "center"
  },
  inputContainer: { 
    paddingHorizontal: 0 
  },
  inputStyle: { 
    fontSize: 16, 
    color: "#333" 
  },
  label: { 
    fontSize: 16, 
    color: "#333", 
    marginTop: 20, 
    marginBottom: 10, 
    fontWeight: "500" 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerRight: {
    marginRight: 10,
  },
});
