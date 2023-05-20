import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const cardData = {
  name: "Cuyahoga River",
  link: "https://images.unsplash.com/photo-1604871318776-94d7e917dc52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
};

const card = new Card(cardData, "#card__template");
filled_card = card.getView();

// Form Fields filled in with information from profile page
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

// ModalElements
const editProfileModal = document.querySelector("#edit-modal");
const addModal = document.querySelector("#add-modal");

// Input for edit profile form modal
const inputTitle = document.querySelector(".modal__input_type_title");
const inputDesc = document.querySelector(".modal__input_type_description");

// Input for add image modal
const inputCardPlace = document.querySelector(".modal__input_type_place");
const inputCardURL = document.querySelector(".modal__input_type_url");

// List of all cards with images
const cardsList = document.querySelector(".cards__list");

// Functionality for Opening the Edit Profile Modal
const editProfileButton = document.querySelector(".profile__edit-button");

// Form Elements
const modalAddImageCardForm = document.querySelector("#add-image-form");
const previewCaption = document.querySelector(".modal__preview_caption");
const previewImage = document.querySelector(".modal__preview_image");

// Functionality for closing modals with Escape key
function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function fillProfileForm(profileTitle, profileDesc) {
  inputTitle.value = profileTitle;
  inputDesc.value = profileDesc;
}

function openEditProfileModal() {
  openModal(editProfileModal);
  fillProfileForm(profileTitle.textContent, profileDesc.textContent);
}

editProfileButton.addEventListener("click", openEditProfileModal);

// Functionality for Closing the Edit Profile Modal
const modalEditProfileCloseButton = document.querySelector(
  ".modal__close-button"
);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeEditProfileModal() {
  closeModal(editProfileModal);
}

// Functionality for Opening the Add Image Modal
const addButton = document.querySelector(".profile__add-button");

function openAddImageModal() {
  openModal(addModal);
}

addButton.addEventListener("click", openAddImageModal);

/* Functionality for Closing Add Image Modal */
const modalAddImageCloseButton = document.querySelector(
  "#modal-add-image-close"
);

function closeAddImageModal() {
  closeModal(addModal);
}

// Functionality for Save Submit Button Add Image Modal
// Save new Title (Name on Profile) and Description (Role or Job Title)

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  closeEditProfileModal();
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

//Functionality for clicking outside of the modal form or with the close button to close it
const modals = document.querySelectorAll(".modal");
modals.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modalElement);
    }
  });
});

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const cardPlace = inputCardPlace.value;
  const cardUrl = inputCardURL.value;
  const newCard = { name: cardPlace, link: cardUrl };
  const newCardElement = getCardElement(newCard);
  cardsList.prepend(newCardElement);
  modalAddImageCardForm.reset();
  const inputList = [inputCardPlace, inputCardURL];
  const submitButton = evt.submitter;
  toggleButtonState(inputList, submitButton, config);
  closeAddImageModal();
}

modalAddImageCardForm.addEventListener("submit", handleAddImageFormSubmit);

//Get element for Preview Image Modal in order to update with image and caption
const previewImageModal = document.querySelector("#preview-image-modal");

// Close Image Preview by Clicking on X
function closeImagePreviewModal() {
  closeModal(previewImageModal);
}

// Rendering cards from array with html template element
const cardTemplate = document.querySelector("#card__template").content;

// Create a new card

function getCardElement(data) {
  //Clone the template element with all its content and store in a cardElement variable
  // const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  //Access the card title and image that was passed in and store them in variables
  // const cardName = data["name"];
  // const cardLink = data["link"];

  // Get card IMG element from the templated cardelement
  //const cardImage = cardElement.querySelector(".card__image");

  //Set the path of the image to the link field of the object
  // cardElement.querySelector(".card__image").src = cardLink;
  //cardImage.src = cardLink;

  //Set the image alt text to the name field of the object
  //cardImage.alt = cardName;

  //Set the card title to the name field of the object, too
  //const cardCaption = cardElement.querySelector(".card__caption");
  //cardCaption.textContent = cardName;

  //ADDED TO Card.js------------------------------------------------
  // Create like button functionality once card is created
  // const likeButton = cardElement.querySelector(".card__like-button");
  // likeButton.addEventListener("click", () => {
  //   likeButton.classList.toggle("card__like-button_active");
  // });--------------------------------------------------------------

  // ADDED to Card.js-------------------------------
  // Create delete button functionality once card is created
  // const deleteButton = cardElement.querySelector(".card__delete-button");
  // deleteButton.addEventListener("click", () => {
  //   cardElement.remove();
  // });-------------------------------------------------

  // Create Open Image Preview functionality - click card image for preview modal

  // Function that opens Preview Image Modal with correct image and caption
  function openPreviewImageModal() {
    openModal(previewImageModal);
    previewCaption.textContent = cardName;
    previewImage.src = cardLink;
    previewImage.alt = cardName;
  }

  // When card image is clicked is launches the modal
  cardImage.addEventListener("click", () => {
    openPreviewImageModal();
  });

  // Return the ready HTML element with the filled in data
  return cardElement;
}

// Create a loop and run getCardElement over the array initialCards
// In the loop, use appropriate built-in DOM method to add HTML element to this page

initialCards.forEach((card) => {
  const newCardElement = getCardElement(card);
  cardsList.append(newCardElement);
});
