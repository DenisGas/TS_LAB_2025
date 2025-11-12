// src/modules/articles.ts

console.log("Articles module loaded");

import type { Photo } from "../types/photo";
import { openModal } from "./modal";

export function createArticles(photos: Photo[], container: HTMLElement): void {
  photos.forEach((photo) => {
    const article = document.createElement("article");
    article.classList.add("photo-card");

    // Припускаємо, що localUrl був доданий раніше
    const srcUrl = photo.localUrl || photo.url;

    article.innerHTML = `
      <a class="image">
        <img src="${srcUrl}" alt="${photo.title}" data-full="${srcUrl}" />
      </a>
      <div class="inner">
        <h4>${photo.title}</h4>
      </div>
    `;
    container.appendChild(article);
  });

  // 2. Додаємо слухач подій ТІЛЬКИ ПІСЛЯ того, як елементи додані в DOM
  document.querySelectorAll(".image img").forEach((img) => {
    img.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLImageElement;
      const src = target.dataset.full!;

      // Викликаємо імпортовану функцію
      openModal(src, target.alt);
    });
  });
}
