const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__input");

// export const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: ".popup__button-inactive",
//   inputErrorClass: ".form__input_type_error",
//   errorClass: ".form__input-error_active",
// };

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const inputList = Array.from(form.querySelectorAll(".popup__input"));
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button-inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-inactive");
  }
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

enableValidation();


