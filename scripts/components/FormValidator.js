export class FormValidator {
    
    constructor(settings, formToBeValidated) {
        this._formElement = settings.formElement;
        this._formInput = settings.formInput;
        this._buttonElementClass = settings.buttonElement;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formToBeValidated = formToBeValidated;
        this._inputList = Array.from(this._formToBeValidated.querySelectorAll(this._formInput));
        this._buttonElement = this._formToBeValidated.querySelector(this._buttonElementClass);
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
      
    resetValidation() {
      this._toggleButtonState(this._inputList, this._buttonElement);

      this._inputList.forEach((formInput) => {
        this._hideInputError(this._formToBeValidated, formInput);
      });

    }

    _setEventListeners() {

        this._toggleButtonState(this._inputList, this._buttonElement);
        this._inputList.forEach((formInput) => {
          formInput.addEventListener("input", (event) => {
            this._isValid(this._formToBeValidated, formInput);
            this._toggleButtonState(this._inputList, this._buttonElement);
          });
        });
    };

    enableValidation() {
      this._setEventListeners();
    }
};