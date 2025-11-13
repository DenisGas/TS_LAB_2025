import type { BaseProduct } from "./BaseProduct";

export type Clothing = BaseProduct & {
  category: "clothing";
  size: "S" | "M" | "L" | "XL";
};
