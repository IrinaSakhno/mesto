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

const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileFormButton = document.querySelector(".popup__close-button");
const profileFormSubmit = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-field-name");
const jobInput = document.querySelector(".popup__form-field-occupation");
const profileForm = document.querySelector(".popup__change-name");
const currentName = document.querySelector(".profile__name");
const currentOccupation = document.querySelector(".profile__occupation");
const newCardPopup = document.querySelector("#popup__new-card");
const addNewCardButton = document.querySelector(".profile__add-button");
const closeNewCardButton = document.querySelector(".close");
const createNewCardButton = document.querySelector(".popup__create-button");
const cardNameInput = document.querySelector(".popup__form-field-card");
const urlInput = document.querySelector(".popup__form-field-source");
const newCardForm = document.querySelector(".popup__form_card");
const pictureSection = document.querySelector("#popup__opened-picture");
const closePictureSectionButton = document.querySelector(".popup__close-button_image");

function openPicturePopup(card) {
  pictureSection.classList.add("popup_opened");
  pictureSection.classList.remove("popup_closed");
  const imageToShow = card.querySelector(".elements__image");
  const openedPicture = document.querySelector(".popup__picture");
  openedPicture.src = imageToShow.src;
  const openedPictureCaption = document.querySelector(".popup__picture-caption");
  const descriptionToShow = card.querySelector(".elements__card-name");
  openedPictureCaption.textContent = descriptionToShow.textContent;
}

function closePicturePopup() {
  pictureSection.classList.remove("popup_opened");
  pictureSection.classList.add("popup_closed");
}

function openNewCardForm() {
  newCardPopup.classList.add("popup_opened");
  newCardPopup.classList.remove("popup_closed");
}

function closeNewCardForm() {
  newCardPopup.classList.remove("popup_opened");
  newCardPopup.classList.add("popup_closed");
}

function openNamePopup() {
  profileForm.classList.add("popup_opened");
  profileForm.classList.remove("popup_closed");
  nameInput.value = currentName.innerText;
  jobInput.value = currentOccupation.innerText;
}

function closeNamePopup() {
  profileForm.classList.remove("popup_opened");
  newCardPopup.classList.remove("popup_opened");
  profileForm.classList.add("popup_closed");
  newCardPopup.classList.add("popup_closed");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentOccupation.textContent = jobInput.value;
  closeNamePopup();
}

function likeCard(evt) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("elements__like_active")) {
    eventTarget.classList.remove("elements__like_active");
  } else {
    eventTarget.classList.add("elements__like_active");
  }
}

function removeCard() {
  const deletingItem = this.parentElement;
  deletingItem.remove();
}

function addCard(name, link) {
  const cardTemplate = document.querySelector("#new-card").content;
  const gallery = document.querySelector(".elements__gallery");
  const galleryElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const galleryImage = galleryElement.querySelector(".elements__image");
  galleryImage.src = link;
  galleryImage.alt = name;
  galleryElement.querySelector(".elements__card-name").textContent = name;

  gallery.prepend(galleryElement);

  const likeButton = galleryElement.querySelector(".elements__like");
  likeButton.addEventListener("click", likeCard);

  const trashButton = galleryElement.querySelector(".elements__trash");
  trashButton.addEventListener("click", removeCard);
  galleryImage.addEventListener("click", function () {
    openPicturePopup(galleryElement);
  });
}

function createNewCard(evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, urlInput.value);
  closeNewCardForm();
}

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});

editProfileButton.addEventListener("click", openNamePopup);
profileFormSubmit.addEventListener("submit", formSubmitHandler);
closeProfileFormButton.addEventListener("click", closeNamePopup);
addNewCardButton.addEventListener("click", openNewCardForm);
closeNewCardButton.addEventListener("click", closeNewCardForm);
newCardForm.addEventListener("submit", createNewCard);
closePictureSectionButton.addEventListener("click", closePicturePopup);
