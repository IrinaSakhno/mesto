import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
    }
    
    _getInputValues() {

    }

    setEventListeners() {
        const closeButtons = document.querySelectorAll(".popup__close-button");
        closeButtons.forEach((button) => {
            const popup = button.closest(".popup");
            button.addEventListener("click", () => this.close(popup));
          });
          
        const overlays = document.querySelectorAll(".popup__overlay");
          overlays.forEach((overlay) => {
            overlay.addEventListener("click", function (e) {
              popups.forEach((popup) => this.close(popup));
            });
          });

          this._popupSelector.addEventListener("submit", formSubmitCallback);
        
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        this._popupSelector.reset();
    }
}