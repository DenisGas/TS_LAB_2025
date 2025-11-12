// src/modules/articles.ts
console.log("Articles module loaded");
import { openModal } from "./modal.js";
export function createArticles(photos, container) {
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
            const target = event.currentTarget;
            const src = target.dataset.full;
            // Викликаємо імпортовану функцію
            openModal(src, target.alt);
        });
    });
}
//# sourceMappingURL=articles.js.map