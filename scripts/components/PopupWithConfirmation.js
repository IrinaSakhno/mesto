import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    
    open(card) {
        super.open();
        this._popup.addEventListener('submit', this._removeCard);
    }

    close() {
        super.close();
        this._popupSelector.removeEventListener('submit', this._removeCard);
    } 
    

}