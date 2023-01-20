import { Order } from "../../../models/api/order";

export interface OrdersListProps {
  orders: Order[];
  onCardClick: (order: Order) => void;
}
