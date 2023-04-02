
import { confirmationOFDeleting } from "../../pages/index.js"
export class Card {
  _name = "";
  _link = "";
  _templateSelector = "";
  
  constructor (data, templateSelector, handleCardClick, userId, putLike, removeLike) {
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
    this._myId = userId;
    this._putLike = putLike;
    this._removeLike = removeLike;
  }
  
  _likeCard(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains("elements__like_active")) {
      this._removeLike(this._cardId)
        .then((res) => {
          eventTarget.classList.remove("elements__like_active");
          this._likeQuantity.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._putLike(this._cardId)
      .then((res) => {
        eventTarget.classList.add("elements__like_active");
        this._likeQuantity.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }
  
  _removeCard(evt, api) {
    // const deletingItem = evt.target.closest(".elements__item");
    this._galleryElement.remove();
    this._galleryElement = null;
    api.deleteCard(this._cardId);
  }
  
  _confirmCardRemoving(evt, api) {
    confirmationOFDeleting.open();
    confirmationOFDeleting.setEventListeners();
    const buttonDeletingCard = document.querySelector('.popup__delete-confirmation-button');
    buttonDeletingCard.addEventListener("click", () => {
      this._removeCard(evt, api);
      confirmationOFDeleting.close();
    });
  }

  _setEventListeners(api) {
    this._likeButton.addEventListener("click", (evt) => { this._likeCard(evt) });
    this._trashButton.addEventListener("click", (evt) => {this._confirmCardRemoving(evt)});
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

