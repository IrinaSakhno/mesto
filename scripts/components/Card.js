
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
  
  _removeCard(evt) {
    const deletingItem = evt.target.closest(".elements__item");
    deletingItem.remove();
  }
  
  // _confirmCardRemoving(evt) {
  //   const confirmationOFDeleting = document.querySelector('.popup__delete-card');
  //   confirmationOFDeleting.classList.add("popup_opened");
  //   const button = confirmationOFDeleting.querySelector('.popup__delete-confirmation-button');
  //   button.addEventListener("click", () => {console.log('zaebalo vsyo!')});

  // }

  _setEventListeners(api) {
    this._likeButton.addEventListener("click", (evt) => { this._likeCard(evt, api) });
    this._trashButton.addEventListener("click", this._removeCard);
    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  
  createCard(api) {
    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._galleryElement.querySelector(".elements__card-name").textContent = this._name;
    this._likeQuantity.textContent = this._likes.length;
    if (this._likes.find(x => x._id === 'c61cf0854b6c5e975ca1e6cc')) {
      this._likeButton.classList.add("elements__like_active");
    } else {
      this._likeButton.classList.remove("elements__like_active");
    };
    this._setEventListeners(api);
  
    return this._galleryElement;
  }
}

