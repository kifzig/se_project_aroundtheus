export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
