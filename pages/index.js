import "./index.css";

import {
  settings,
  buttonEditProfile,
  nameInput,
  jobInput,
  buttonAddNewCard,
  gallery,
  editButtonAvatar,
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


const cardList = new Section(
  {
    renderer: (initialCard) => {
      const data = {
        name: initialCard.name,
        link: initialCard.link,
        likes: initialCard.likes,
        cardId: initialCard._id,
        ownerId: initialCard.owner._id,
      };
      cardList.addItem(createCard(data));
    },
  },
  gallery
);


Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([profile, cards]) => {
    userInfoDisplay.setUserInfo(profile.name, profile.about);
    userInfoDisplay.setUserAvatar(profile.avatar);
    userInfoDisplay.setUserId(profile._id);

    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });


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
          cardList.addItem(createCard(data));
          formForNewCard.close();
        })

        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          formForNewCard.renderLoading(false);
        });
    }
  );
  formForNewCard.setEventListeners();

  function openNewCardForm() {
    formForNewCard.open();
    cardValidation.resetValidation();
  }
  buttonAddNewCard.addEventListener("click", openNewCardForm);

const userInfoDisplay = new UserInfo({
  currentNameSelector: ".profile__name",
  currentOccupationSelector: ".profile__occupation",
  avatarSelector: ".profile__avatar",
});

function handleCardClick(name, link) {
  pictureOpened.open(name, link);
}

const pictureOpened = new PopupWithImage("#popup__opened-picture");
pictureOpened.setEventListeners();

const formForProfile = new PopupWithForm(
  "#popup__change-name",
  ({ name, occupation }) => {

    formForProfile.renderLoading(true);
    api
      .editProfile({ name: name, about: occupation })
      .then(() => {
        userInfoDisplay.setUserInfo(name, occupation);
        formForProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formForProfile.renderLoading(false);
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

function createCard(data) {
  const card = new Card(
    data,
    "#new-card",
    handleCardClick,
    userInfoDisplay.getUserId()
  );
  const cardElement = card.createCard();
  return cardElement;
}

function openAvatarPopup() {
  formForNewAvatar.open();
  avatarValidation.resetValidation();
}

const formForNewAvatar = new PopupWithForm(
  "#popup__new-avatar",
  ({ source }) => {
    formForNewAvatar.renderLoading(true);
    api.changeAvatar(source)
      .then(() => {
        userInfoDisplay.setUserAvatar(source);
        formForNewAvatar.close()})
      .finally(() => {
        formForNewAvatar.renderLoading(false);
      });
  }
);
formForNewAvatar.setEventListeners();

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
