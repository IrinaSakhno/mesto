export class Card {
  _name = "";
  _link = "";
  _templateSelector = "";
  
  constructor (data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._galleryElement = this._cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
    this._galleryImage = this._galleryElement.querySelector(".elements__image");
    this._likeButton = this._galleryElement.querySelector(".elements__like");
    this._trashButton = this._galleryElement.querySelector(".elements__trash");
    this._handleCardClick = handleCardClick;
  }
  
  _likeCard(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains("elements__like_active")) {
      eventTarget.classList.remove("elements__like_active");
    } else {
      eventTarget.classList.add("elements__like_active");
    }
  }
  
  _removeCard(evt) {
    const deletingItem = evt.target.closest(".elements__item");
    deletingItem.remove();
  }
  
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._likeCard);
    this._trashButton.addEventListener("click", this._removeCard);
    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  
  createCard() {
    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._galleryElement.querySelector(".elements__card-name").textContent = this._name;
  
    this._setEventListeners();
  
    return this._galleryElement;
  }
}

