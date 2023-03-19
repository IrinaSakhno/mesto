export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
  export const settings = {
    formElement: ".popup__form",
    formInput: ".popup__form-field",
    buttonElement: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__form-field_type_error",
    errorClass: "popup__input-error_active",
  };
  
  export const buttonEditProfile = document.querySelector(".profile__edit-button");
  export const nameInput = document.querySelector(".popup__form-field-name");
  export const jobInput = document.querySelector(".popup__form-field-occupation");
  export const currentName = document.querySelector(".profile__name");
  export const currentOccupation = document.querySelector(".profile__occupation");
  export const buttonAddNewCard = document.querySelector(".profile__add-button");
  export const cardNameInput = document.querySelector(".popup__form-field-card");
  export const urlInput = document.querySelector(".popup__form-field-source");
  export const newCardForm = document.querySelector(".popup__form_card");
  export const gallery = document.querySelector(".elements__gallery");
  export const openedPicture = document.querySelector(".popup__picture");
  export const openedPictureCaption = document.querySelector(".popup__picture-caption");

