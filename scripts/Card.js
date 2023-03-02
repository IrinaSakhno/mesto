import { openPopup, closePopup, openedPicture, openedPictureCaption, pictureSection } from "./index.js";

export class Card {
  _name = "";
  _link = "";
  _templateSelector = "";
  
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  
  _openPicturePopup() {
    openedPicture.src = this._link;
    openedPicture.alt = this._name;
    openedPictureCaption.textContent = this._name;
    openPopup(pictureSection);
  }
  
  closePicturePopup() {
    closePopup(pictureSection);
  }

  _likeCard(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains("elements__like_active")) {
      eventTarget.classList.remove("elements__like_active");
    } else {
      eventTarget.classList.add("elements__like_active");
    }
  }
  
  _removeCard() {
    const deletingItem = this.parentElement;
    deletingItem.remove();
  }
  
  createCard() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const galleryElement = cardTemplate
      .querySelector(".elements__item")
      .cloneNode(true);
    const galleryImage = galleryElement.querySelector(".elements__image");
    galleryImage.src = this._link;
    galleryImage.alt = this._name;
    galleryElement.querySelector(".elements__card-name").textContent = this._name;
  
    const likeButton = galleryElement.querySelector(".elements__like");
    likeButton.addEventListener("click", this._likeCard);
  
    const trashButton = galleryElement.querySelector(".elements__trash");
    trashButton.addEventListener("click", this._removeCard);
  
    galleryImage.addEventListener("click", () => {
      this._openPicturePopup(this._name, this._link);
    });
  
    return galleryElement;
  }
}

