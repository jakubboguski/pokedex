import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Dimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

const HEADER_MAX_HEIGHT = SCREEN_HEIGHT * 0.25;
const HEADER_MIN_HEIGHT = 32;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const usePokemonAnimations = () => {
  const animatedRef = useAnimatedRef<Animated.View>();
  const scrollY = useSharedValue(0);
  const imageX = useSharedValue(0);
  const imageY = useSharedValue(0);
  const imageWidth = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const measureImage = useCallback(() => {
    runOnUI(() => {
      "worklet";
      const measurement = measure(animatedRef);

      if (measurement) {
        imageX.value = measurement.pageX;
        imageY.value = measurement.pageY;
        imageWidth.value = measurement.width;
      }
    })();
  }, []);

  useFocusEffect(() => {
    measureImage();
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    return {
      height,
      width: height,
    };
  }, [scrollY]);

  const animatedImageStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    const centerX = SCREEN_WIDTH / 2;
    const translateX = centerX - imageX.value;

    const positionX = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [translateX, centerX],
      Extrapolation.CLAMP
    );

    const positionY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [imageY.value / 2, -HEADER_MIN_HEIGHT / 2],
      Extrapolation.CLAMP
    );

    return {
      position: "absolute",
      height,
      width: height,
      transform: [{ translateX }],
      left: positionX,
      top: positionY,
    };
  }, [scrollY, imageX, imageY]);

  const animatedContentStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [-HEADER_SCROLL_DISTANCE, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  }, [scrollY]);

  return {
    onScroll,
    animatedHeaderStyle,
    animatedImageStyle,
    animatedContentStyle,
    animatedRef,
    measureImage,
  };
};
