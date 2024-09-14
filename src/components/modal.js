// Функция закрытия через ESC
function handleEscKeyUp(e) {
  if (e.key === "Escape") {
    const popupActive = document.querySelector(".popup_is-opened");
    closePopup(popupActive);
  }
}

// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", handleEscKeyUp);
  popup.addEventListener("mousedown", handleCloseOverlay);
}

// Функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
  popup.removeEventListener("mousedown", handleCloseOverlay);
}

// Функция обработчик закрытия модального окна через оверлей
function handleCloseOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
}
