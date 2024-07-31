import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const modalEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const formElementEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = container.querySelector(".profile__add-button");
const addCardForm = document.querySelector('form[name="new-place"]');
const closeModalButtons = document.querySelectorAll(".popup__close");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard, likeCard, openImage);
  addNewCard(newCard);
});

// Функция открытия модального окна картинки
function openImage(link, alt) {
  popupImageElement.src = link;
  popupImageElement.link = alt;
  popupCaption.textContent = alt;
  openPopup(popupImage);
}

// Обработчик клика открытия модального окна профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(modalEdit);
});

// Обработчик клика открытия модального окна добавления новой карточки
profileAddButton.addEventListener("click", function () {
  openPopup(modalNewCard);
});

// Функция обработчик закрытия модального окна через кнопку
closeModalButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// Функция добавления значения в инпуты модального окна - редактирования профиля
function handleEditProfile(e) {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(modalEdit);
}

// Функция добавления значения в инпуты модального окна новой карточки
function addNewCardSubmit(e) {
  e.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = createCard({ name, link }, deleteCard, likeCard, openImage);

  addNewCard(newCard, true);
  addCardForm.reset();
  closePopup(modalNewCard);
}

// Функция добавления новой карточки
function addNewCard(item, toStart) {
  if (toStart === true) {
    placesList.prepend(item);
  } else {
    placesList.append(item);
  }
}

formElementEdit.addEventListener("submit", handleEditProfile);
addCardForm.addEventListener("submit", addNewCardSubmit);
