import { useNavigation } from "expo-router";
import React, {
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/utils";

type Props = {
  title: string;
  rightComponent?: React.ReactNode;
};

export const PageContainer: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  title,
  rightComponent = <View style={styles.right} />,
}) => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={goBack} style={[styles.button, styles.part]}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, styles.part]}>{title}</Text>
        <View style={[styles.part]}>{rightComponent}</View>
      </View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 16,
    alignSelf: "flex-start",
  },
  header: {
    display: "flex",
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    alignSelf: "flex-start",
    flexGrow: 2,
    paddingTop: 12,
  },
  part: {
    flex: 1,
  },
  right: {
    position: "absolute",
  },
});
