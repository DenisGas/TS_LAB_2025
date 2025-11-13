import type { BaseProduct } from "./BaseProduct";

export type Electronics = BaseProduct & {
  category: "electronics";
  warrantyPeriod: number | null;
};
