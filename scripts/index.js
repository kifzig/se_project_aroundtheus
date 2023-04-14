const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Form Fields field in with information from profile page
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const inputTitle = document.querySelector(".modal__input_type_title");
const inputDesc = document.querySelector(".modal__input_type_description");

/* Functionality for Opening the Edit Profile Modal */
const editButton = document.querySelector(".profile__edit-button");

function openModal(modal) {
  modal.classList.add("modal__opened");
  inputTitle.value = profileTitle.textContent;
  inputDesc.value = profileDesc.textContent;
}

function openEditProfileModal() {
  const modal = document.querySelector(".modal");
  openModal(modal);
}

editButton.addEventListener("click", openEditProfileModal);

/* Functionality for Closing the Edit Profile Modal */
const modalCloseButton = document.querySelector(".modal__close");

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

function closeEditProfileModal() {
  const modal = document.querySelector(".modal");
  closeModal(modal);
}

modalCloseButton.addEventListener("click", closeEditProfileModal);

/*Save edited title and description */

const modalForm = document.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  closeEditProfileModal();
}

modalForm.addEventListener("submit", handleProfileFormSubmit);

/* Rendering cards from array with html template element */
const cardTemplate = document.querySelector("#card__template").content;

function getCardElement(data) {
  //Clone the template element with all its content and store in a cardElement variable
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  //Access the card title and image and store them in variables
  const cardName = data["name"];
  const cardLink = data["link"];

  //Set the path of the image to the link field of the object
  cardElement.querySelector(".card__image").src = cardLink;

  //Set the image alt text to the name field of the object
  cardElement.querySelector(".card__image").alt = cardName;

  //Set the card title to the name field of the object, too
  cardCaption = cardElement.querySelector(".card__caption");
  cardCaption.textContent = cardName;

  //Return the ready HTML element with the filled in data
  return cardElement;
}

// Create a loop and run getCardElement over the array initialCards
// In the loop, use appropriate built-in DOM method to add HTML element to this page

const cardsList = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  const newCardElement = getCardElement(card);
  cardsList.append(newCardElement);
});
