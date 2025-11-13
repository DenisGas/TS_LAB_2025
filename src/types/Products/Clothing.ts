import type { BaseProduct } from "./BaseProduct";

export type Clothing = BaseProduct & {
  category: "clothing";
  size: "S" | "M" | "L" | "XL";
};

export type Books = BaseProduct & {
  category: "books";
  autor: string | string[] | null;
};
