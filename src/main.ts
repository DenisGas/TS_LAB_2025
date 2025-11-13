import { addToCart, calculateTotal } from "./modules/cart";
import { findProduct, filterByPrice } from "./modules/search";
import type { Electronics } from "./types/Products/Electronics";
import type { Books, Clothing } from "./types/Products/Clothing";
import type { BaseProduct } from "./types/Products/BaseProduct";
import type { CartItem } from "./types/CartItem";
import { electronics, clothing, books } from "./mock/data";
import { log, delimeter } from "./utils/consoleUtils";

function main() {
  const allProducts: BaseProduct[] = [...electronics, ...clothing, ...books];

  allProductsInfo(allProducts);

  delimeter();

  // Тестування функцій
  const phone = findProduct(allProducts, 1);
  const note = findProduct(allProducts, 2);
  const nothing = findProduct(allProducts, -1);
  const t_shirt = findProduct(allProducts, 3);

  const cart: CartItem<BaseProduct>[] = addToCart([], phone, 1);

  let total = calculateTotal(cart);

  log("cart: ", cart, "\nСума:", total);

  delimeter();

  addToCart(cart, note, 2);
  addToCart(cart, nothing, 2);
  addToCart(cart, t_shirt, 1);

  total = calculateTotal(cart);

  log("cart: ", cart, "\nСума", total);

  delimeter();

  const affordableProducts = filterByPrice(allProducts, 1500);
  log("Affordable products (<= 1500₴):", affordableProducts);
}

function allProductsInfo(allProducts: BaseProduct[]): void {
  log("All Products Information:");

  for (const product of allProducts) {
    log(
      "🛍️ ",
      product.name,
      "-",
      product.price,
      "₴ ",
      product?.description ? "Опис: " + product.description : ""
    );

    if ("warrantyPeriod" in product) {
      log("📱 Гарантійний період:", (product as Electronics).warrantyPeriod);
    }

    if ("size" in product) {
      log("👕 Розмір:", (product as Clothing).size);
    }

    if ("autor" in product) {
      log("📚 Автор:", (product as Books).autor);
    }

    log("");
  }
}

main();
