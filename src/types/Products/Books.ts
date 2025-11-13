import type { BaseProduct } from "./BaseProduct";

export type Books = BaseProduct & {
  category: "books";
  autor: string | string[] | null;
};
