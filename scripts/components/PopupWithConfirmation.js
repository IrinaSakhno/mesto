import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }
    
    open() {
        super.open();
        this._submitButton.addEventListener('click', this._handleConfirmation);

    }

    close() {
        super.close();
        this._submitButton.removeEventListener('click', this._handleConfirmation);
    } 

    submitCallback(callback) {
        this._handleConfirmation = callback.bind(this);
    }

}