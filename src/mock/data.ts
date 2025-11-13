import type { Clothing } from "../types/Products/Clothing";
import type { Books } from "../types/Products/Books";
import type { Electronics } from "../types/Products/Electronics";

// Створення тестових даних
export const electronics: Electronics[] = [
  {
    id: 1,
    name: "Телефон",
    price: 10000,
    category: "electronics",
    description: "Смартфон останньої моделі",
    warrantyPeriod: 12,
  },
  {
    id: 2,
    name: "Ноутбук Gaming Pro MAX XIOMI X3 Ultra KFC Edition",
    price: 25000,
    category: "electronics",
    description: "Потужний ноутбук для роботи та ігор",
    warrantyPeriod: null,
  },
];
export const clothing: Clothing[] = [
  {
    id: 3,
    name: "Футболка",
    price: 500,
    category: "clothing",
    size: "M",
  },
  {
    id: 4,
    name: "Джинси",
    price: 1200,
    category: "clothing",
    size: "L",
    description: "Зручні джинси для щоденного носіння",
  },
];

export const books: Books[] = [
  {
    id: 5,
    name: "Потужний TypeScript",
    price: 800,
    category: "books",
    autor: "Потужний Автор",
    description: "Все про TypeScript від А до Я красавичк)",
  },
  {
    id: 6,
    name: "Перемога Буде",
    price: 600,
    category: "books",
    autor: ["Видатний Автор", "і ше один трошки попроще"],
  },
];
