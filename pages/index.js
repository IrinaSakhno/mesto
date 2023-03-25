import "./index.css";

import {
  settings,
  buttonEditProfile,
  nameInput,
  jobInput,
  buttonAddNewCard,
  cardNameInput,
  urlInput,
  gallery,
} from "../scripts/utils/constants.js";

import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "e039fbc5-c9a5-4fc5-afa9-2046730c027f",
    contentType: "application/json",
  },
});


function init () {

}

api.getInitialCards().then((res) => {
  
  const cardList = new Section(
    {
      items: res,
      renderer: (initialCard) => {
        const data = { name: initialCard.name, link: initialCard.link };
        cardList.addItem(createCard(data));
      },
    },
    gallery
  );
  cardList.renderItems();

  const formForNewCard = new PopupWithForm(
    "#popup__new-card",
    ({ card, source }) => {
      api.addNewCard({name: card, link: source}).then((res) => {
        const data = {name: res.name, link: res.link};
        cardList.addItem(createCard(data))
      })
    }
  );
  formForNewCard.setEventListeners();

  function openNewCardForm() {
    formForNewCard.open();
    cardValidation.resetValidation();
  }
  buttonAddNewCard.addEventListener("click", openNewCardForm);
  
});

const userInfoDisplay = new UserInfo({
  currentNameSelector: ".profile__name",
  currentOccupationSelector: ".profile__occupation",
});

api.getProfile().then((res) => {
  userInfoDisplay.getUserInfo().name = res.name;
  userInfoDisplay.getUserInfo().job = res.about;
  document.querySelector(".profile__avatar").src = res.avatar;
});

function handleCardClick(name, link) {
  pictureOpened.open(name, link);
}

const pictureOpened = new PopupWithImage("#popup__opened-picture");
pictureOpened.setEventListeners();



const formForProfile = new PopupWithForm(
  "#popup__change-name",
  ({ name, occupation }) => {
    userInfoDisplay.setUserInfo(name, occupation);
    api.editProfile({name: name, about: occupation});
  }
);
formForProfile.setEventListeners();


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



buttonEditProfile.addEventListener("click", openNamePopup);


const profileValidation = new FormValidator(
  settings,
  document.querySelector(".popup__form_profile")
);
profileValidation.enableValidation();
const cardValidation = new FormValidator(
  settings,
  document.querySelector(".popup__form_card")
);
cardValidation.enableValidation();
