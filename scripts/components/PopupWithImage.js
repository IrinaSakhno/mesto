import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._openedPicture = document.querySelector(".popup__picture");
        this._openedPictureCaption = document.querySelector(".popup__picture-caption");
    }

    open(name, link) {
        this._openedPicture.src = link;
        this._openedPicture.alt = name;
        this._openedPictureCaption.textContent = name;
        
        super.open();
        
    }
}