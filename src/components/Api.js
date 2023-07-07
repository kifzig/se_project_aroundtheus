export default class Api {
  constructor(options) {
    //constructor
    this.baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getImageInfo(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  editProfile(path, id, fullName, profession) {
    return fetch(`${this.baseUrl}/${path}/${id}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: fullName,
        about: profession,
      }),
    }).then(this._processResponse);
  }

  addImageToApi(placeName, imgLink) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: imgLink,
      }),
    }).then(this._processResponse);
  }

  removeImageFromAPI(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  addLikeToAPI(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processResponse);
  }

  removeLikeFromAPI(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  updateProfilePic(imgLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imgLink,
      }),
    }).then(this._processResponse);
  }
}
