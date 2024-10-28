import React from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import { Card, ICardProps } from "./card";

type IFlatListProps<T> = Omit<FlatListProps<T>, "renderItem">;

export interface IListProps<T> extends IFlatListProps<T> {
  data: T[];
  itemExtractor: (item: T) => {
    title: string;
    subtitle: string;
  };
  noPadding?: boolean;
  CardComponent?: React.FunctionComponent<ICardProps>;
}

export const List = <T,>({
  data,
  itemExtractor,
  CardComponent = Card,
  noPadding = false,
  ...props
}: IListProps<T>): React.FunctionComponentElement<IListProps<T>> => {
  return (
    <FlatList
      scrollEnabled={false}
      {...props}
      data={data}
      style={styles.list}
      contentContainerStyle={[
        styles.contentContainerStyle,
        !noPadding && styles.listPadding,
      ]}
      renderItem={({ item, index }) => {
        const { title, subtitle } = itemExtractor(item);
        return (
          <CardComponent
            title={title}
            subtitle={subtitle}
            isFirst={index === 0}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 8,
  },
  contentContainerStyle: {
    marginVertical: 8,
  },
  listPadding: {
    padding: 16,
  },
});
