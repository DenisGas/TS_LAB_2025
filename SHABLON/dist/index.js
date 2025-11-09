"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const getBtn = document.getElementById("getPhoto");
const container = document.querySelector("#posts");
getBtn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 1000);
  container.style.display = "grid";
  container.innerHTML = "";
  getData().then((photos) => {
    const photosWithLocal = photos.map((photo) =>
      Object.assign(Object.assign({}, photo), {
        localUrl: `https://picsum.photos/seed/${photo.id + random}/600/400`,
      })
    );
    createArticles(photosWithLocal);
  });
});
function getData() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=6"
      );
      const photos = yield response.json();
      return photos;
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
      return [];
    }
  });
}
function createArticles(photos) {
  photos.forEach((photo) => {
    const article = document.createElement("article");
    article.classList.add("photo-card");
    article.innerHTML = `
      <a class="image">
        <img src="${photo.localUrl}" alt="${photo.title}" data-full="${photo.localUrl}" />
      </a>
      <div class="inner">
        <h4>${photo.title}</h4>
      </div>
    `;
    container.appendChild(article);
  });
  // Відкриття модалки при кліку
  document.querySelectorAll(".image img").forEach((img) => {
    img.addEventListener("click", (event) => {
      const target = event.currentTarget;
      const src = target.dataset.full;
      openModal(src, target.alt);
    });
  });
}
// Модальне вікно
function openModal(src, alt) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content animate">
      <span class="close-button">&times;</span>
      <img src="${src}" alt="${alt}" />
      <p>${alt}</p>
    </div>
  `;
  document.body.appendChild(modal);
  // Закриття
  const closeBtn = modal.querySelector(".close-button");
  closeBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal(modal);
  });
}
function closeModal(modal) {
  modal.classList.remove("animate");
  modal.classList.add("fade-out");
  setTimeout(() => modal.remove(), 300);
}
