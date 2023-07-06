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

  getInitialData(id) {
    return fetch(`${this.baseUrl}/${id}`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getImageInfo(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getUserInfo(id) {
    return fetch(`${this.baseUrl}/users/${id}`, {
      headers: this._headers,
    }).then(this._processResponse);
  }

  getPromiseAll() {
    return Promise.all(
      this.getInitialCards(),
      this.getUserInfo(((path = "users"), (id = "me")))
    );
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

  removeImageFromAPI(path, cardId) {
    fetch(`${this.baseUrl}/${path}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  addLikeToAPI(path, cardId) {
    return fetch(`${this.baseUrl}/${path}/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processResponse);
  }

  removeLikeFromAPI(path, cardId) {
    return fetch(`${this.baseUrl}/${path}/${cardId}`, {
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
