export class Card {
  _name = "";
  _link = "";
  _templateSelector = "";
  
  constructor ({data, templateSelector, handleCardClick, userId, putLike, removeLike, handleTrashButtonClick}) {
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
    this._handleTrashButtonClick = handleTrashButtonClick;
  }

  removeCard() {
    this._galleryElement.remove();
    this._galleryElement = null;
}

_isCardLiked() {
  if (this._likes.some((user) => {
    return this._userId === user._id;
  })) {
    this._likeBtn.classList.add('element__like-btn_active');
  }
}

  handleLike(data) {
    this._likes = data.likes;
    this._likeQuantity.textContent = this._likes.length;
    this._likeButton.classList.toggle("elements__like_active");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("elements__like_active")) {
        this._removeLike(this._cardId);
      } else {
        this._putLike(this._cardId);
      }
    });
    this._trashButton.addEventListener("click", (evt) => {this._handleTrashButtonClick(this._cardId)});
    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  
  createCard() {
    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._galleryElement.querySelector(".elements__card-name").textContent = this._name;
    this._isCardLiked();
    this._likeQuantity.textContent = this._likes.length;
    if (this._ownerId !== this._myId) { 
      this._trashButton.remove(); 
    } 
    this._setEventListeners();
  
    return this._galleryElement;
  }
}

