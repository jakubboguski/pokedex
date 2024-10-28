import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/utils";

export const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PINK,
    padding: 20,
  },
  errorText: {
    color: Colors.WHITE,
    fontSize: 18,
    textAlign: "center",
  },
});
