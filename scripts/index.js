// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = item.name;

  cardDeleteButton.addEventListener("click", cardDelete);

  return cardElement;
}

initialCards.forEach(function (item) {
  placesList.append(createCard(item));
});

function cardDelete(event) {
  event.target.closest(".card").remove();
}
