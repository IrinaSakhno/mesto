import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this._inputList = this._popup.querySelectorAll('.popup__form-field');
        this._form = this._popup.querySelector('.popup__form');
    }
    
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmitCallback(this._getInputValues());
            this.close();
        });
        
    }

    close() {
        super.close();
        this._form.reset();

    }
}