import './index.css';

import { initialCards, settings, buttonEditProfile, 
  nameInput, jobInput, currentName, currentOccupation, 
  buttonAddNewCard, cardNameInput, urlInput, newCardForm, 
  gallery, openedPicture, openedPictureCaption } 
  from '../scripts/utils/constants.js';

import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo.js";


const userInfoDisplay = new UserInfo ({currentName, currentOccupation});

function handleCardClick(name, link) {
  openedPicture.src = link;
  openedPicture.alt = name;
  openedPictureCaption.textContent = name;
  pictureOpened.open(name, link);
}

const pictureOpened = new PopupWithImage("#popup__opened-picture");
pictureOpened.setEventListeners();

const formForNewCard = new PopupWithForm("#popup__new-card", () => {
  const data = {name: cardNameInput.value, link: urlInput.value};
  gallery.prepend(createCard(data));
});
formForNewCard.setEventListeners();

const formForProfile = new PopupWithForm("#popup__change-name", ({name, occupation}) => {
  userInfoDisplay.setUserInfo(name, occupation);
})
formForProfile.setEventListeners();

function openNewCardForm() {
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
