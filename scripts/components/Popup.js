export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._overlays = document.querySelectorAll(".popup__overlay");
        this._closeButtons = document.querySelectorAll(".popup__close-button");
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    setEventListeners() {
        this._closeButtons.forEach((button) => {
            const popup = button.closest(".popup");
            button.addEventListener("click", () => this.close(popup));
        });
          
        this._overlays.forEach((overlay) => {
            const popup = overlay.closest(".popup");
            overlay.addEventListener("click", () => this.close(popup));
        });
    };
}