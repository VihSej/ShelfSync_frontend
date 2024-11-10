import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg"; // Make sure this import is correct

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 200,
  color = "black",
  backgroundColor = "white",
}) => {
  return (
    <View style={styles.container}>
      {/* Use QRCode from react-native-qrcode-svg */}
      <QRCode
        value={value || " "} // Add fallback empty space if value is undefined
        size={size}
        color={color}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

export default QRCodeGenerator;
