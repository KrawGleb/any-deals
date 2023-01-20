import "./OrderCard.scss";
import React from "react";
import { OrderCardProps } from "./OrderCardProps";
import AdvertCard from "../../adverts/card/AdvertCard";

export default function OrderCard({ order, onClick }: OrderCardProps) {
  return <AdvertCard onClick={() => onClick(order)} advert={order.advert} />;
}
