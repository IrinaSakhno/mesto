const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonCloseProfileForm = document.querySelector(".popup__close-button");
const formSubmitProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-field-name");
const jobInput = document.querySelector(".popup__form-field-occupation");
const profileForm = document.querySelector("#popup__change-name");
const currentName = document.querySelector(".profile__name");
const currentOccupation = document.querySelector(".profile__occupation");
const newCardPopup = document.querySelector("#popup__new-card");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const buttonCloseNewCard = document.querySelector(".close");
const buttonCreateNewCard = document.querySelector(".popup__create-button");
const cardNameInput = document.querySelector(".popup__form-field-card");
const urlInput = document.querySelector(".popup__form-field-source");
const newCardForm = document.querySelector(".popup__form_card");
const pictureSection = document.querySelector("#popup__opened-picture");
const buttonClosePictureSection = document.querySelector(".popup__close-button_image");
const gallery = document.querySelector(".elements__gallery");
const openedPicture = document.querySelector(".popup__picture");
const openedPictureCaption = document.querySelector(".popup__picture-caption");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.classList.remove("popup_closed");
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.classList.add("popup_closed");
};

function openPicturePopup(name, link) {
  openPopup(pictureSection);
  openedPicture.src = link;
  openedPicture.alt = name;
  openedPictureCaption.textContent = name;
}

function closePicturePopup() {
  closePopup(pictureSection);
}

function openNewCardForm() {
  openPopup(newCardPopup);
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
  closePopup(newCardPopup);
}

function submitProfileForm(evt) {
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

function createCard(name, link) {
  const cardTemplate = document.querySelector("#new-card").content;
  const galleryElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const galleryImage = galleryElement.querySelector(".elements__image");
  galleryImage.src = link;
  galleryImage.alt = name;
  galleryElement.querySelector(".elements__card-name").textContent = name;
  
  const likeButton = galleryElement.querySelector(".elements__like");
  likeButton.addEventListener("click", likeCard);

  const trashButton = galleryElement.querySelector(".elements__trash");
  trashButton.addEventListener("click", removeCard);

  galleryImage.addEventListener("click", function () {
    openPicturePopup(name, link);
  });

  return galleryElement;
}

function addToDom (card) {
  gallery.prepend(card);
}

function createNewCard(evt) {
  evt.preventDefault();
  const card = createCard(cardNameInput.value, urlInput.value);
  addToDom(card);

  closeNewCardForm();
  newCardForm.reset();
}

initialCards.forEach(function (item) {
  addToDom(createCard(item.name, item.link));
});

buttonEditProfile.addEventListener("click", openNamePopup);
formSubmitProfile.addEventListener("submit", submitProfileForm);
buttonCloseProfileForm.addEventListener("click", closeNamePopup);
buttonAddNewCard.addEventListener("click", openNewCardForm);
buttonCloseNewCard.addEventListener("click", closeNewCardForm);
newCardForm.addEventListener("submit", createNewCard);
buttonClosePictureSection.addEventListener("click", closePicturePopup);
