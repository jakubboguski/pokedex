import React, { forwardRef, useCallback } from "react";

import Animated, { AnimatedRef, AnimatedStyle } from "react-native-reanimated";
import { Pokemon } from "@/models";
import { ImageStyle, ViewStyle } from "react-native";

interface IPokemonImageProps {
  pokemon?: Pokemon;
  animatedHeaderStyle: AnimatedStyle<ViewStyle>;
  animatedImageStyle: AnimatedStyle<ImageStyle>;
  ref: AnimatedRef<Animated.View>;
  measureImage: () => void;
}

export const PokemonImage = forwardRef<Animated.View, IPokemonImageProps>(
  ({ pokemon, animatedHeaderStyle, animatedImageStyle, measureImage }, ref) => {
    const onLayout = useCallback(() => {
      measureImage();
    }, [measureImage]);

    return (
      <Animated.View style={[animatedHeaderStyle]} ref={ref}>
        <Animated.Image
          style={[animatedImageStyle]}
          source={{ uri: pokemon?.sprites?.front_default }}
          onLayout={onLayout}
        />
      </Animated.View>
    );
  }
);
