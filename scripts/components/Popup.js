export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    setEventListeners() {
        const closeButtons = document.querySelectorAll(".popup__close-button");
        closeButtons.forEach((button) => {
            const popup = button.closest(".popup");
            button.addEventListener("click", () => this.close(popup));
        });
          
        const overlays = document.querySelectorAll(".popup__overlay");
        overlays.forEach((overlay) => {
            const popup = overlay.closest(".popup");
            overlay.addEventListener("click", () => this.close(popup));
        });
    };
}