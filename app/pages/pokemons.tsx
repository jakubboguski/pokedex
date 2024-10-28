import React from "react";
import { ActivityIndicator } from "react-native";

import {
  PageContainer,
  PokemonCard,
  PokemonsFooter,
} from "@/components";
import { List } from "@/components/list";
import { usePokemons } from "@/hooks";

export default function PokemonsPage() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePokemons();

  return (
    <PageContainer title="Pokemons">
        {isLoading && <ActivityIndicator />}
        {!isLoading && data && (
          <List
            data={data.pages.flat()}
            itemExtractor={(item) => ({
              title: item.name,
              subtitle: item.url,
            })}
            CardComponent={PokemonCard}
            ListFooterComponent={
              <PokemonsFooter
                isHidden={!hasNextPage}
                onPress={fetchNextPage}
                isLoading={isFetchingNextPage}
              />
            }
            scrollEnabled={true}
          />
        )}
    </PageContainer>
  );
}
