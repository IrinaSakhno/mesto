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

function init() {}

api
  .getInitialCards()
  .then((res) => {
    const cardList = new Section(
      {
        items: res.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ),
        renderer: (initialCard) => {
          const data = {
            name: initialCard.name,
            link: initialCard.link,
            likes: initialCard.likes,
            cardId: initialCard._id,
            ownerId: initialCard.owner._id,
          };
          cardList.addItem(createCard(data, api));
        },
      },
      gallery
    );
    cardList.renderItems();
    console.log(res);

    const formForNewCard = new PopupWithForm(
      "#popup__new-card",
      ({ card, source }) => {
        formForNewCard.renderLoading(true);
        api
          .addNewCard({ name: card, link: source })
          .then((res) => {
            const data = {
              name: res.name,
              link: res.link,
              likes: res.likes,
              cardId: res._id,
              ownerId: res.owner._id,
            };
            cardList.addItem(createCard(data, api));
          })

          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            formForNewCard.renderLoading(false);
            formForNewCard.close();
          });
      }
    );
    formForNewCard.setEventListeners();

    function openNewCardForm() {
      formForNewCard.open();
      cardValidation.resetValidation();
    }
    buttonAddNewCard.addEventListener("click", openNewCardForm);
  })

  .catch((err) => {
    console.log(err);
  });

const userInfoDisplay = new UserInfo({
  currentNameSelector: ".profile__name",
  currentOccupationSelector: ".profile__occupation",
});

api
  .getProfile()
  .then((res) => {
    document.querySelector(".profile__name").textContent = res.name;
    document.querySelector(".profile__occupation").textContent = res.about;
    document.querySelector(".profile__avatar").src = res.avatar;
  })

  .catch((err) => {
    console.log(err);
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
    formForProfile.renderLoading(true);
    api
      .editProfile({ name: name, about: occupation })
      .then((res) => console.log(res))
      .finally(() => {
        formForProfile.renderLoading(false);
        formForProfile.close();
      });
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

function createCard(data, api) {
  const card = new Card(data, "#new-card", handleCardClick);
  const cardElement = card.createCard(api);
  return cardElement;
}

function openAvatarPopup() {
  formForNewAvatar.open();
  avatarValidation.resetValidation();
}

const formForNewAvatar = new PopupWithForm(
  "#popup__new-avatar",
  ({ source }) => {
    document.querySelector(".profile__avatar").src = source;
    formForNewAvatar.renderLoading(true);
    api.changeAvatar(source).finally(() => {
      formForNewAvatar.renderLoading(false);
      formForNewAvatar.close();
    });
  }
);
formForNewAvatar.setEventListeners();
const editButtonAvatar = document.querySelector(".profile__avatar-edit-button");
editButtonAvatar.addEventListener("click", openAvatarPopup);

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
const avatarValidation = new FormValidator(
  settings,
  document.querySelector(".popup__form_avatar")
);
avatarValidation.enableValidation();
