import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/utils";

export interface ICardProps {
  title: string;
  subtitle: string;
  isFirst?: boolean;
}

export const Card: React.FunctionComponent<ICardProps> = ({
  title,
  subtitle,
  isFirst = false,
}) => {
  return (
    <View style={[styles.card, isFirst && styles.first]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 8,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 8,
  },
  first: {
    marginTop: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 12,
    color: Colors.GRAY,
    marginTop: 4,
  },
});
