const settings = {
  formElement: ".popup__form",
  formInput: ".popup__form-field",
  buttonElement: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__form-field_type_error",
  errorClass: "popup__input-error_active",
};

const formElement = document.querySelector(".popup__form");

const showInputError = (formElement, formInput) => {
  formInput.classList.add(settings.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = formInput.validationMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (formElement, formInput) => {
  formInput.classList.remove(settings.inputErrorClass);
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formError.textContent = "";
  formError.classList.remove(settings.errorClass);
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput);
  } else {
    hideInputError(formElement, formInput);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", false);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.formInput)
  );
  const buttonElement = formElement.querySelector(settings.buttonElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", (event) => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(settings);
