import './index.css';

import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo.js";

const initialCards = [
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

const buttonEditProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__form-field-name");
const jobInput = document.querySelector(".popup__form-field-occupation");
const profileForm = document.querySelector("#popup__change-name");
const currentName = document.querySelector(".profile__name");
const currentOccupation = document.querySelector(".profile__occupation");
const newCardPopup = document.querySelector("#popup__new-card");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".popup__form-field-card");
const urlInput = document.querySelector(".popup__form-field-source");
const newCardForm = document.querySelector(".popup__form_card");
const gallery = document.querySelector(".elements__gallery");
const openedPicture = document.querySelector(".popup__picture");
const openedPictureCaption = document.querySelector(".popup__picture-caption");
const pictureSection = document.querySelector("#popup__opened-picture");

const userInfoDisplay = new UserInfo ({currentName, currentOccupation});

function handleCardClick(name, link) {
  openedPicture.src = link;
  openedPicture.alt = name;
  openedPictureCaption.textContent = name;
  pictureOpened.open(name, link);
}

const pictureOpened = new PopupWithImage(pictureSection);
pictureOpened.setEventListeners();

const formForNewCard = new PopupWithForm(newCardPopup, () => {
  const data = {name: cardNameInput.value, link: urlInput.value};
  gallery.prepend(createCard(data));
});
formForNewCard.setEventListeners();

const formForProfile = new PopupWithForm(profileForm, ({name, occupation}) => {
  userInfoDisplay.setUserInfo(name, occupation);
})
formForProfile.setEventListeners();

function openNewCardForm() {
  newCardForm.reset();
  formForNewCard.open();
  cardValidation.resetValidation();
}

function openNamePopup() {
  formForProfile.open();
  const userInformation = userInfoDisplay.getUserInfo();
  nameInput.value = userInformation.name.innerText;
  jobInput.value = userInformation.job.innerText;
  profileValidation.resetValidation();
}

function submitProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentOccupation.textContent = jobInput.value;
  closeNamePopup();
}

function createCard(data) {
  const card = new Card(data, "#new-card", handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

const cardList = new Section ({
    items: initialCards,
    renderer: (initialCard) => {
      const data = {name: initialCard.name, link: initialCard.link};
      cardList.addItem(createCard(data));
    },
  },
  gallery
);
cardList.renderItems();

buttonEditProfile.addEventListener("click", openNamePopup);
buttonAddNewCard.addEventListener("click", openNewCardForm);


const profileValidation = new FormValidator(settings, document.querySelector(".popup__form_profile"));
profileValidation.enableValidation();
const cardValidation = new FormValidator(settings, document.querySelector(".popup__form_card"));
cardValidation.enableValidation();
