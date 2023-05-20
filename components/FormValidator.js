class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      showInputError(inputEl);
    } else {
      hideInputError(inputEl);
    }
  }

  hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  enableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  disableButton(submitButton, inactiveButtonClass) {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  toggleButtonState() {
    //Bring over enableButton and disableButton
    if (hasInvalidInput()) {
      enableButton();
      return;
    }
    disableButton();
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(inputEl);
        toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    _setEventListeners(formEl, options);
  }
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//We're going to have a new validator for each form
//This will actually be called from index.js
// const editFormValidator = new FormValidator();
// const addFormValidator = new FormValidator();

export default FormValidator;
