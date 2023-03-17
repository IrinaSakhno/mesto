import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
    }
    
    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__form-field');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmitCallback(this._getInputValues());
            this.close();
        });
        
    }

    close() {
        super.close();
        this._popupSelector.reset();
    }
}