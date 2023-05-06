// enabling validation by calling enableValidation()
// pass all the settings on call

function enableValidation(options) {
  // This works the same as Array.from [... ] - spread operator - expects array or array like object - makes a copy
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // Look for all inputs inside of form
    // Loop through all the inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error class to input red
    // display error message
    // disable button
    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);

//We have to write function enableValidation
