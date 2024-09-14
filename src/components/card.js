import { putLikeCard, deleteLikeCard, deleteDataCard } from "./api";

// Функция создания карточек
export function createCard(
  item,
  deleteCard,
  likeCard,
  openImage,
  userId,
  cardId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like-counter");

 
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeCounter.textContent = item.likes.length;

  if (item.owner._id !== userId) {
    cardDeleteButton.remove();
  }

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardId, cardElement);
  });

  if (item.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () =>
    likeCard(cardId, userId, item.likes._id, cardLikeButton, likeCounter)
  );

  cardImage.addEventListener("click", () => {
    openImage(item.link, item.name);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardId, card) {
  deleteDataCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция лайка
export function likeCard(cardId, userId, item, cardLikeButton, likeCounter) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardId)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLikeCard(cardId)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
