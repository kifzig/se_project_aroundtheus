import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithFormConfirmDelete extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector, handleFormSubmit);
  }

  open(data) {
    super.open();
    this.data = data;
    // this.data = data;
    // this.imageId = this.data.imageId;
    // return this.imageId;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _handleSubmit = () => {
    const inputValues = this.data;
    this._handleFormSubmit(inputValues);
  };
}
