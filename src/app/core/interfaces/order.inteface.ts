import { Product } from "@core/interfaces/product.inteface";

export interface Order {
  id: number;
  user: string;
  orderDate: Date;
  orderStatus: OrderStatus;
  orderDetails: OrderDetail[];
}

export enum OrderStatus {
  NEW = "NEW",
  SHIPPED = "SHIPPED",
  CANCELED = "CANCELED",
  CLOSED = "CLOSED",
}

export interface OrderDetail {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}