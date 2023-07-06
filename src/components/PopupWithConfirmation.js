import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector, handleFormSubmit);
  }

  open(data) {
    super.open();
    this.data = data;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _handleSubmit = () => {
    const inputValues = this.data;
    this._handleFormSubmit(inputValues);
  };
}
