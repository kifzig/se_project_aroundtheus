// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, options) {
    const errorMessageEl
}

function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
    } else {
        hideInputError();
    }
}




function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
    });
  });
}

function enableValidation(options) {
  // This works the same as Array.from [... ] - spread operator - expects array or array like object - makes a copy
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);

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
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);

//We have to write function enableValidation
