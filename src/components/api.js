const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "b6ca3ba9-5033-4c5b-8632-aa71e068f07a",
    "Content-type": "application/json",
  },
};

const response = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserRequest = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(response);
};

export const loadCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(response);
};

export const newAvatarApi = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(response);
};

export const editProfileApi = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  }).then(response);
};

export const addNewCardApi = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(response);
};

export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  }).then(response);
};

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  }).then(response);
};

export const deleteDataCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  }).then(response);
};
