var editButton = document.querySelector(".profile__edit-button");
var closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__form-field-name");
let jobInput = document.querySelector(".popup__form-field-occupation");
let popup = document.querySelector(".popup");
let currentName = document.querySelector(".profile__name");
let currentOccupation = document.querySelector(".profile__occupation");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentOccupation.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", formSubmitHandler);
closeButton.addEventListener("click", closePopup);
