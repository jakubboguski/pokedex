import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "@/models";
import { getPokemonTypeColors } from "@/utils";

export interface IPokemonTypeProps {
  types: Pokemon["types"];
}

export const PokemonTypes: React.FunctionComponent<IPokemonTypeProps> = ({
  types,
}) => {
  return (
    <FlatList
      data={types}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => {
        const { backgroundColor, textColor } = getPokemonTypeColors(
          item.type.name
        );
        return (
          <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.text, { color: textColor }]}>
              {item.type.name}
            </Text>
          </View>
        );
      }}
      scrollEnabled={false}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  separator: {
    width: 4,
  },
  container: {
    display: "flex",
    padding: 2,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    textTransform: "capitalize",
  },
});
