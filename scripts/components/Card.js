import { PopupWithConfirmation } from "./PopupWithConfirmation.js"
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
    this._likeQuantity = this._galleryElement.querySelector(".elements__like-quantity");
    this._likes = data.likes;
    this._cardId = data.cardId;
    this._ownerId = data.ownerId;
    this._myId = 'c61cf0854b6c5e975ca1e6cc';
  }
  
  _likeCard(evt, api) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains("elements__like_active")) {
      eventTarget.classList.remove("elements__like_active");
      api.removeLike(this._cardId)
        .then((res) => {this._likeQuantity.textContent=res.likes.length})
    } else {
      eventTarget.classList.add("elements__like_active");
      api.putLike(this._cardId)
      .then((res) => {this._likeQuantity.textContent=res.likes.length})
    }
    
  }
  
  _removeCard(evt, api) {
    const deletingItem = evt.target.closest(".elements__item");
    deletingItem.remove();
    api.deleteCard(this._cardId);
  }
  
  _confirmCardRemoving(evt, api) {
    const confirmationOFDeleting = new PopupWithConfirmation('#popup__delete-card');
    confirmationOFDeleting.open();
    confirmationOFDeleting.setEventListeners();
    const button = document.querySelector('.popup__delete-confirmation-button');
    button.addEventListener("click", () => {
      this._removeCard(evt, api);
      confirmationOFDeleting.close();
    });
  }

  _setEventListeners(api) {
    this._likeButton.addEventListener("click", (evt) => { this._likeCard(evt, api) });
    this._trashButton.addEventListener("click", (evt) => {this._confirmCardRemoving(evt, api)});
    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  
  createCard(api) {
    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._galleryElement.querySelector(".elements__card-name").textContent = this._name;
    this._likeQuantity.textContent = this._likes.length;
    if (this._likes.find(x => x._id === this._myId)) {
      this._likeButton.classList.add("elements__like_active");
    } else {
      this._likeButton.classList.remove("elements__like_active");
    };
    if (this._ownerId !== this._myId) {
      this._trashButton.remove();
    }
    this._setEventListeners(api);
  
    return this._galleryElement;
  }
}

