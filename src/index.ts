type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  localUrl?: string;
};

const getBtn = document.getElementById("getPhoto") as HTMLButtonElement;
const container = document.querySelector("#posts") as HTMLElement;

getBtn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 1000);
  container.style.display = "grid";
  container.innerHTML = "";
  getData().then((photos) => {
    const photosWithLocal = photos.map((photo) => ({
      ...photo,
      localUrl: `https://picsum.photos/seed/${photo.id + random}/600/400`,
    }));

    createArticles(photosWithLocal);
  });
});

async function getData(): Promise<Photo[]> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=6"
    );
    const photos: Photo[] = await response.json();
    return photos;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return [];
  }
}

function createArticles(photos: Photo[]): void {
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
      const target = event.currentTarget as HTMLImageElement;
      const src = target.dataset.full!;
      openModal(src, target.alt);
    });
  });
}

// Модальне вікно
function openModal(src: string, alt: string): void {
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
  const closeBtn = modal.querySelector(".close-button") as HTMLElement;
  closeBtn.addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal(modal);
  });
}

function closeModal(modal: HTMLElement): void {
  modal.classList.remove("animate");
  modal.classList.add("fade-out");
  setTimeout(() => modal.remove(), 300);
}
