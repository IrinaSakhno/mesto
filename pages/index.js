var editButton = document.querySelector("#edit-button");
var closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector("#form");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#occupation");

function openPopup() {
  let popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
}

editButton.addEventListener("click", openPopup);

function closePopup() {
  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let currentName = document.querySelector("#current-name");
  currentName.textContent = nameInput.value;
  let currentOccupation = document.querySelector("#current-occupation");
  currentOccupation.textContent = jobInput.value;
  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
