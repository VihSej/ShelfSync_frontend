import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { register, logout } from "../services/auth";
import { useEffect, useState } from "react";

export default function RegisterScreen() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {(async () => { 
    await logout(); 
    setLoading(false);
  })()}, []);

  const handleRegister = async () => {
    const isSuccess = await register(name, email, password);
    if (isSuccess)
      router.push("/");
    else
      Alert.alert("Register failed", "Please try again");
  }

  if (loading)
    return <View style={styles.container}>
      <ActivityIndicator size="large" color="green" />
    </View>

  return <ScrollView style={styles.container}>
    <Stack.Screen options={{ headerShown: false }} />
    
    <Image
      source={require("../assets/images/app-icon.jpg")}
      style={styles.picture}
    />

    <Text style={styles.label}>Name</Text>
    <Input
      value={name}
      onChangeText={setName}
      containerStyle={styles.inputContainer}
      inputStyle={styles.inputStyle}
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

    <TouchableOpacity style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>Register</Text>
    </TouchableOpacity>
    <View style={styles.linkContainer}>
      <Text style={styles.linkText0}>Already have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>
    </View>

  </ScrollView>
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
    marginTop: 10, 
    // marginBottom: 10, 
    fontWeight: "500" 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 50,
    marginBottom: 20,
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
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  linkText0: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
