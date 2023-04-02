import { Popup } from './Popup.js';
import { deleteConfirmationButton } from '../utils/constants.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, deleteCard) {
        super(popupSelector);
        this._deleteCard = deleteCard;
    }
    
    open(cardElement, cardId) {
        super.open();
        deleteConfirmationButton.addEventListener('click', () => this._removeCard(cardElement, cardId));

    }

    close() {
        super.close();
        deleteConfirmationButton.removeEventListener('click', this._removeCard);
    } 
    
    _removeCard(cardElement, cardId) {
        cardElement.remove();
        cardElement = null;
        this._deleteCard(cardId);
        this.close();
    }

}