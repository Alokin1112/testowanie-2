import { Product } from "@core/interfaces/product.inteface";

export interface Order {
  id: number;
  user: string;
  orderDate: Date | string;
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

export interface PostOrderRequestBody {
  user: string;
  orderDate: string,
  orderStatus: OrderStatus;
}
