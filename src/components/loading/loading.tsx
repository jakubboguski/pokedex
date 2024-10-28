import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Skeleton } from "./skeleton";

const { width } = Dimensions.get("window");

export const Loading = () => {
  return (
    <View style={styles.container}>
      <Skeleton width={width / 5} height={20} />
      <View style={styles.spacing} />
      <Skeleton width={width / 2} height={20} borderRadius={8} />
      <View style={styles.spacing} />
      <Skeleton width={width / 4} height={20} />
      <View style={styles.spacing} />
      <Skeleton width={width / 4} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
  },
  spacing: {
    height: 16,
  },
});
