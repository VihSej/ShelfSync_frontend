import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { login } from "../services/auth";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const isSuccess = await login(email, password);
    if (isSuccess)
      router.push("/");    // TODO: Navigate somewhere
    else
      Alert.alert("Login failed", "Invalid email or password");
  }

  return <View style={styles.container}>
    <Stack.Screen options={{ headerShown: false }} />
    
    <Image
      source={require("../assets/images/app-icon.jpg")}
      style={styles.picture}
    />

    <Text style={styles.label}>Email</Text>
    <Input
      value={email}
      onChangeText={setEmail}
      containerStyle={styles.inputContainer}
      inputStyle={styles.inputStyle}
    />

    <Text style={styles.label}>Password</Text>
    <Input
      value={password}
      onChangeText={setPassword}
      secureTextEntry={true}
      containerStyle={styles.inputContainer}
      inputStyle={styles.inputStyle}
    />

    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

  </View>
}

const styles = StyleSheet.create({
  picture: {
    marginTop: 100,
    width: 100,
    height: 100,
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
  button: {
    margin: 100,
    height: 50,
    width: 200,
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "600", 
    alignSelf: "center", 
    textAlign: "center" 
  },
});
