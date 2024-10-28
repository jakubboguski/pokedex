import React from "react";

import { Link } from "expo-router";
import { Card, ICardProps } from "./card";
import { TouchableOpacity } from "react-native";
import { getIdFromUrl } from "@/utils";

export const PokemonCard: React.FunctionComponent<ICardProps> = ({
  title,
  subtitle,
  isFirst = false,
}) => {
  const name = title;
  const url = subtitle;

  const id = getIdFromUrl(url);

  return (
    <Link href={`/pages/pokemon/${id}?name=${name}`} push asChild>
      <TouchableOpacity>
        <Card title={name} subtitle={url} isFirst={isFirst} />
      </TouchableOpacity>
    </Link>
  );
};
