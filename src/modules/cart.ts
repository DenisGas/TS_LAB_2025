import type { BaseProduct } from "../types/Products/BaseProduct";
import type { CartItem } from "../types/CartItem";

export const calculateTotal = <T extends BaseProduct>(
  cart: CartItem<T>[]
): number => {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T | undefined,
  quantity: number
): CartItem<T>[] => {
  if (product) {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
  }
  return cart;
};
