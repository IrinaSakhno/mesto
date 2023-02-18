const settings = {
  formElement: ".popup__form",
  formInput: ".popup__form-field",
  buttonElement: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__form-field_type_error",
  errorClass: "popup__input-error_active",
};

const formElement = document.querySelector(".popup__form");

const showInputError = (formElement, formInput, settings) => {
  formInput.classList.add(settings.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = formInput.validationMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (formElement, formInput, settings) => {
  formInput.classList.remove(settings.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = "";
  formError.classList.remove(settings.errorClass);
};

const isValid = (formElement, formInput, settings) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, settings);
  } else {
    hideInputError(formElement, formInput, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", false);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.formInput)
  );
  const buttonElement = formElement.querySelector(settings.buttonElement);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", (event) => {
      isValid(formElement, formInput, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

enableValidation(settings);
