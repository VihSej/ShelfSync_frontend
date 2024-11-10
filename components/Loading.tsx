import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingProps {
  text?: string;
  size?: "small" | "large";
  color?: string;
  style?: "default" | "overlay" | "minimal";
}

export default function Loading({
  text = "Loading...",
  size = "large",
  color = "darkcyan",
  style = "default",
}: LoadingProps) {
  if (style === "minimal") {
    return <ActivityIndicator size={size} color={color} />;
  }

  const Container = style === "overlay" ? View : React.Fragment;
  const containerProps = style === "overlay" ? { style: styles.overlay } : {};

  return (
    <Container {...containerProps}>
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={[styles.text, { color }]}>{text}</Text>}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
