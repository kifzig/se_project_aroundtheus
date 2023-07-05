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

  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  enableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  disableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  loadingButton() {
    this._submitButton.textContent = "Saving...";
  }

  toggleButtonState() {
    //Bring over enableButton and disableButton
    if (this.hasInvalidInput()) {
      this.enableButton();
      return;
    }
    this.disableButton();
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this.checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  //Check this public function
  resetFormValidation() {
    this.toggleButtonState();
    this._form.addEventListener("reset", (e) => {
      this.disableButton();
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
