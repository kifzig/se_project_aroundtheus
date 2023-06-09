// Form Fields filled in with information from profile page
export const profileTitleSelector = ".profile__title";
export const profileDescSelector = ".profile__description";
export const profileTitle = document.querySelector(".profile__title");
export const profileDesc = document.querySelector(".profile__description");

// Input for Edit Profile Form Modal
export const inputTitle = document.querySelector(".modal__input_type_title");
export const inputDesc = document.querySelector(
  ".modal__input_type_description"
);

// Edit Profile Form Modal Element
export const editProfileModalSelector = "#edit-profile-modal";
export const editProfileModal = document.querySelector("#edit-profile-modal");

// Edit Profile Button
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

export const editFormElement = document.forms["edit-profile-form"];
export const inputSelector = ".modal__input";
export const modalOpenSelector = ".modal_opened";

//Used in Card.js
export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewCaption = document.querySelector(".modal__preview_caption");
export const previewImage = document.querySelector(".modal__preview_image");

// Used in index.js
export const initialCards = [
  {
    name: "Yosemite",
    link: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Big Bend",
    link: "https://images.unsplash.com/photo-1524936987904-0ee26e8730ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Joshua Tree",
    link: "https://images.unsplash.com/photo-1597777933704-61bde8bd8e02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Great Smoky Mountains",
    link: "https://images.unsplash.com/photo-1546975559-026eed2e9219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Zion National Park",
    link: "https://images.unsplash.com/photo-1606681129845-a6ab3e1017e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Key West",
    link: "https://images.unsplash.com/photo-1645453732932-bf36ea9afc6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
];
