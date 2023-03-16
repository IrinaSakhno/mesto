import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
    }
    
    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener("submit", formSubmitCallback);
        
    }

    close() {
        super.close();
        this._popupSelector.reset();
    }
}