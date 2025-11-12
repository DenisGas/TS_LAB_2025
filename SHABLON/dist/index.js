import { getData } from "./module/api.js";
import { createArticles } from "./module/articles.js";
const getBtn = document.getElementById("getPhoto");
const container = document.querySelector("#posts");
getBtn.addEventListener("click", () => {
    container.style.display = "grid";
    container.innerHTML = "";
    getData().then((photos) => {
        createArticles(photos, container);
    });
});
//# sourceMappingURL=index.js.map