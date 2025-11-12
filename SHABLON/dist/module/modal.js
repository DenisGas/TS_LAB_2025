console.log("Modal module loaded");
export function openModal(src, alt) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    console.log("Creating modal for:", src, alt);
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
        if (e.target === modal)
            closeModal(modal);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape")
            closeModal(modal);
    });
}
export function closeModal(modal) {
    modal.classList.remove("animate");
    modal.classList.add("fade-out");
    setTimeout(() => modal.remove(), 300);
}
//# sourceMappingURL=modal.js.map