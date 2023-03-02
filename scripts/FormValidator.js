export class FormValidator {
    
    constructor(settings, formToBeValidated) {
        this._formElement = settings.formElement;
        this._formInput = settings.formInput;
        this._buttonElement = settings.buttonElement;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formToBeValidated = formToBeValidated;

    }    

    _showInputError(formElement, formInput) {
        formInput.classList.add(this._inputErrorClass);
        const formError = formElement.querySelector(`.${formInput.id}-error`);
        formError.textContent = formInput.validationMessage;
        formError.classList.add(this._errorClass);
    };
      
    _hideInputError(formElement, formInput) {
        formInput.classList.remove(this._inputErrorClass);
        const formError = formElement.querySelector(`.${formInput.id}-error`);
        formError.textContent = "";
        formError.classList.remove(this._errorClass);
    };
      
    _isValid(formElement, formInput) {
        if (!formInput.validity.valid) {
          this._showInputError(formElement, formInput);
        } else {
          this._hideInputError(formElement, formInput);
        }
    };
      
    _hasInvalidInput(inputList) {
        return inputList.some((formInput) => {
          return !formInput.validity.valid;
        });
    };
      
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.setAttribute("disabled", true);
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.removeAttribute("disabled", false);
        }
    };
      
    enableValidation() {
        const inputList = Array.from(this._formToBeValidated.querySelectorAll(this._formInput));
        const buttonElement = this._formToBeValidated.querySelector(this._buttonElement);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((formInput) => {
          formInput.addEventListener("input", (event) => {
            this._isValid(this._formToBeValidated, formInput);
            this._toggleButtonState(inputList, buttonElement);
          });
        });
    };
};