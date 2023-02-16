const formElement = document.querySelector('.popup__form');


const showInputError = (formElement, formInput) => {
    formInput.classList.add('popup__form-field_type_error');
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formError.textContent = formInput.validationMessage;
    formError.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, formInput) => {
    formInput.classList.remove('popup__form-field_type_error');
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formError.textContent = '';
    formError.classList.remove('popup__input-error_active');
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
        buttonElement.classList.add('popup__submit-button_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
        buttonElement.removeAttribute('disabled', false);
    };
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((formInput) => {
        formInput.addEventListener('input', (event) => {
            isValid(formElement, formInput);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

enableValidation({
    formElement: '.popup__form',
    formInput: '.popup__form-field',
    buttonElement: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__form-field_type_error',
    errorClass: 'popup__input-error_active'
  }); 

enableValidation();