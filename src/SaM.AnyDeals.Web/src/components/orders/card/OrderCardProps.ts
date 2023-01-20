import { Order } from "../../../models/api/order";

export interface OrderCardProps {
    order: Order;
    onClick: (order: Order) => void;    
}