import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const formSubmitProfile = document.querySelector(".popup__form");
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
const popups = document.querySelectorAll(".popup");
const overlays = document.querySelectorAll(".popup__overlay");
export const openedPicture = document.querySelector(".popup__picture");
export const openedPictureCaption = document.querySelector(".popup__picture-caption");
export const pictureSection = document.querySelector("#popup__opened-picture");


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function openNewCardForm() {
  openPopup(newCardPopup);
  const buttonElement = document.querySelector(".popup__create-button");
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add("popup__submit-button_inactive");
}

function closeNewCardForm() {
  closePopup(newCardPopup);
}

function openNamePopup() {
  openPopup(profileForm);
  nameInput.value = currentName.innerText;
  jobInput.value = currentOccupation.innerText;
}

function closeNamePopup() {
  closePopup(profileForm);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentOccupation.textContent = jobInput.value;
  closeNamePopup();
}

function addToDom(card) {
  gallery.prepend(card);
}

function createNewCard(evt) {
  evt.preventDefault();
  const data = {name: cardNameInput.value, link: urlInput.value};
  const card = new Card(data, "#new-card");
  addToDom(card.createCard());

  closeNewCardForm();
  newCardForm.reset();
}

initialCards.forEach(function (item) {
  const data = {name: item.name, link: item.link};
  const card = new Card(data, "#new-card");
  addToDom(card.createCard());
});


const closeButtons = document.querySelectorAll(".popup__close-button");

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

overlays.forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    popups.forEach((popup) => closePopup(popup));
  });
});

buttonEditProfile.addEventListener("click", openNamePopup);
formSubmitProfile.addEventListener("submit", submitProfileForm);
buttonAddNewCard.addEventListener("click", openNewCardForm);
newCardForm.addEventListener("submit", createNewCard);


const profileValidation = new FormValidator(settings, document.querySelector(".popup__form_profile"));
profileValidation.enableValidation();
const cardValidation = new FormValidator(settings, document.querySelector(".popup__form_card"));
cardValidation.enableValidation();
