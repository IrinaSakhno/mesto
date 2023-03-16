import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open() {
        openedPicture.src = link;
        openedPicture.alt = name;
        openedPictureCaption.textContent = name;
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", super._handleEscClose);
    }
}