import React from "react";
import { StyleSheet, Text } from "react-native";
import { IListProps, List } from "./list";

interface IListWithTitleProps<T> extends IListProps<T> {
  title: string;
}

export const ListWithTitle = <T,>({
  title,
  data,
  itemExtractor,
  ...props
}: IListWithTitleProps<T>): React.FunctionComponentElement<
  IListWithTitleProps<T>
> => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <List data={data} itemExtractor={itemExtractor} noPadding {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
