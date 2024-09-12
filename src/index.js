import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserRequest,
  loadCards,
  editProfileApi,
  addNewCardApi,
  newAvatarApi,
} from "./components/api.js";

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const modalEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const formElementEdit = document.querySelector('form[name="edit-profile"]');
const formInputEdit = formElementEdit.querySelector(".popup__input_edit");
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

const avatarForm = document.querySelector('form[name="new-avatar"]');
const profileOpenAvatar = document.querySelector(".profile__avatar");
const profileEditAvatar = document.querySelector(".profile__image");
const modalNewAvatar = document.querySelector(".popup_type_new-avatar");
const avatarUrlInput = document.querySelector(".popup__input_type_url-avatar");

const btnSubmitAvatar = document.querySelector(".button-submit-avatar");
const btnSubmitEditProfile = document.querySelector(
  ".button-submit-edit-profile"
);
const btnSubmitAddNewCard = document.querySelector(
  ".button-submit-add-new-card"
);

let userId;
let cardId;

// Функция открытия модального окна картинки
function openImage(link, alt) {
  popupImageElement.src = link;
  popupImageElement.link = alt;
  popupCaption.textContent = alt;
  openPopup(popupImage);
}

// Обработчик клика открытия модального окна редактирования аватарки
profileOpenAvatar.addEventListener("click", function () {
  openPopup(modalNewAvatar);
  clearValidation(modalNewAvatar, enableValidation);
});

// Обработчик клика открытия модального окна профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(modalEdit);
  clearValidation(modalEdit, enableValidation);
});

// Обработчик клика открытия модального окна добавления новой карточки
profileAddButton.addEventListener("click", function () {
  openPopup(modalNewCard);
  clearValidation(modalNewCard, enableValidation);
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

  renderLoading(true, btnSubmitEditProfile);

  editProfileApi(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closePopup(modalEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitEditProfile);
    });
}

// Функция добавления значения в инпут модального окна редактирования аватарки
function editAvatar(e) {
  e.preventDefault();
  renderLoading(true, btnSubmitAvatar);

  newAvatarApi(avatarUrlInput.value)
    .then((res) => {
      profileEditAvatar.src = res.avatar;

      avatarForm.reset();
      closePopup(modalNewAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarForm.reset();
      renderLoading(false, btnSubmitAvatar);
    });
}

// Функция добавления значения в инпуты модального окна новой карточки
function addNewCardSubmit(e) {
  e.preventDefault();
  renderLoading(true, btnSubmitAddNewCard);

  addNewCardApi(cardNameInput.value, cardLinkInput.value)
    .then((item) => {
      cardId = item._id;
      const newCard = createCard(
        item,
        deleteCard,
        likeCard,
        openImage,
        userId,
        cardId
      );
      addNewCard(newCard, true);
      addCardForm.reset();
      closePopup(modalNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addCardForm.reset();
      renderLoading(false, btnSubmitAddNewCard);
    });
}

// Функция добавления новой карточки
function addNewCard(item, toStart) {
  if (toStart === true) {
    placesList.prepend(item);
  } else {
    placesList.append(item);
  }
}

// Функция загрузки
function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
}

formElementEdit.addEventListener("submit", handleEditProfile);
addCardForm.addEventListener("submit", addNewCardSubmit);
avatarForm.addEventListener("submit", editAvatar);

enableValidation();

Promise.all([getUserRequest(), loadCards()])
  .then(([dataRes, cardRes]) => {
    userId = dataRes._id;
    profileTitle.textContent = dataRes.name;
    profileDescription.textContent = dataRes.about;
    profileEditAvatar.src = dataRes.avatar;

    cardRes.forEach(function (item) {
      cardId = item._id;
      addNewCard(
        createCard(item, deleteCard, likeCard, openImage, userId, cardId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {});
