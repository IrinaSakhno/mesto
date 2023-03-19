
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { Popup } from "../scripts/components/Popup.js";
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

const openedPopup = document.querySelector('.popup_opened');
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
const openedPicture = document.querySelector(".popup__picture");
const openedPictureCaption = document.querySelector(".popup__picture-caption");
const pictureSection = document.querySelector("#popup__opened-picture");


// оставляем
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

const formForProfile = new PopupWithForm(profileForm, () => {
  currentName.textContent = nameInput.value;
  currentOccupation.textContent = jobInput.value;
})
formForProfile.setEventListeners();

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }


// оставляем
function openNewCardForm() {
  newCardForm.reset();
  formForNewCard.open();
  cardValidation.resetValidation();
}

// function closeNewCardForm() {
//   closePopup(newCardPopup);
// }

// оставляем
function openNamePopup() {
  formForProfile.open();
  nameInput.value = currentName.innerText;
  jobInput.value = currentOccupation.innerText;
  profileValidation.resetValidation();
}


// function closeNamePopup() {
//   closePopup(profileForm);
// }

const userInfoDisplay = new UserInfo (nameInput.value, jobInput.value);

function submitProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentOccupation.textContent = jobInput.value;
  closeNamePopup();
}

// оставляем
function createCard(data) {
  const card = new Card(data, "#new-card", handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}


// initialCards.forEach(function (item) {
//   const data = {name: item.name, link: item.link};
//   gallery.prepend(createCard(data));
// });

// оставляем
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


// function createNewCard(evt) {
//   evt.preventDefault();
//   const data = {name: cardNameInput.value, link: urlInput.value};
//   gallery.prepend(createCard(data));

//   closeNewCardForm();
//   newCardForm.reset();
// }




// closeButtons.forEach((button) => {
//   const popup = button.closest(".popup");
//   button.addEventListener("click", () => closePopup(popup));
// });

// overlays.forEach((overlay) => {
//   overlay.addEventListener("click", function (e) {
//     popups.forEach((popup) => closePopup(popup));
//   });
// });

// оставляем
buttonEditProfile.addEventListener("click", openNamePopup);
buttonAddNewCard.addEventListener("click", openNewCardForm);

// newCardForm.addEventListener("submit", createNewCard);
// formSubmitProfile.addEventListener("submit", submitProfileForm);
// оставляем
const profileValidation = new FormValidator(settings, document.querySelector(".popup__form_profile"));
profileValidation.enableValidation();
const cardValidation = new FormValidator(settings, document.querySelector(".popup__form_card"));
cardValidation.enableValidation();
