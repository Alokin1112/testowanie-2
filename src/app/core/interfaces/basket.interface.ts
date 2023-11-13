import { Product } from "@core/interfaces/product.inteface";

export interface BasketItem {
  product: Product,
  quantity: number
}