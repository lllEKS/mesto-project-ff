// Функция создания карточек
function createCard(item, cardDelete, likeCard, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = item.name;

  cardDeleteButton.addEventListener("click", cardDelete);

  cardLikeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {
    openImage(item.link, item.name);
  });

  return cardElement;
}

// Функция удаления карточки
function cardDelete(event) {
  event.target.closest(".card").remove();
}

// Функция лайка
function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

export { createCard, cardDelete, likeCard };
