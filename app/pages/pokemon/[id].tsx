import React from "react";
import { StyleSheet } from "react-native";

import {
  ListWithTitle,
  PageContainer,
  PokemonCard,
  PokemonImage,
  PokemonTypes,
  Loading,
  Error,
} from "@/components";
import { useLocalSearchParams } from "expo-router";
import Animated from "react-native-reanimated";
import {
  HEADER_SCROLL_DISTANCE,
  SCREEN_HEIGHT,
  usePokemonAnimations,
  usePokemonWithEvolution,
} from "@/hooks";

export default function PokemonPage() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();

  const { pokemon, evolution } = usePokemonWithEvolution(Number(id));

  const {
    animatedRef,
    onScroll,
    animatedContentStyle,
    animatedHeaderStyle,
    animatedImageStyle,
    measureImage,
  } = usePokemonAnimations();

  const title = pokemon.data?.name ?? name ?? "Pokemon";

  const error = pokemon.error || evolution.error;
  const loading = pokemon.isLoading && !error;

  return (
    <>
      <PageContainer
        title={title}
        rightComponent={
          <PokemonImage
            ref={animatedRef}
            pokemon={pokemon.data}
            animatedHeaderStyle={animatedHeaderStyle}
            animatedImageStyle={animatedImageStyle}
            measureImage={measureImage}
          />
        }
      />
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        <Animated.View style={[animatedContentStyle, styles.innerContainer]}>
          {loading && <Loading />}
          {!loading && (
            <>
              {pokemon.data?.types && (
                <PokemonTypes types={pokemon.data.types} />
              )}

              {pokemon.data && (
                <ListWithTitle
                  title="First 5 moves"
                  data={pokemon.data.moves}
                  itemExtractor={(item) => ({
                    title: item.move.name,
                    subtitle: item.move.url,
                  })}
                />
              )}

              {evolution.data && (
                <ListWithTitle
                  title="Evolutions"
                  data={evolution.data}
                  itemExtractor={(item) => ({
                    title: item.name,
                    subtitle: item.url,
                  })}
                  CardComponent={PokemonCard}
                />
              )}
            </>
          )}
          {error && <Error message="Pokedex encountered a problem!" />}
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: "flex-start",
    paddingTop: HEADER_SCROLL_DISTANCE,
    minHeight: SCREEN_HEIGHT,
  },
  innerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
