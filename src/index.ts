import type { Photo } from "./types/photo";
import { getData } from "./module/api";
import { createArticles } from "./module/articles";

const getBtn = document.getElementById("getPhoto") as HTMLButtonElement;
const container = document.querySelector("#posts") as HTMLElement;

getBtn.addEventListener("click", () => {
  container.style.display = "grid";
  container.innerHTML = "";
  getData().then((photos: Photo[]) => {
    createArticles(photos, container);
  });
});
