import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/utils";

interface ISkeletonProps {
  width: number;
  height: number;
  borderRadius?: number;
}

export const Skeleton: React.FunctionComponent<ISkeletonProps> = ({
  width,
  height,
  borderRadius = 4,
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[styles.skeleton, animatedStyle, { width, height, borderRadius }]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.LIGHT_GRAY,
  },
});
