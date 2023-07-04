export default class Api {
  constructor(options) {
    //constructor
    this.baseUrl = options.baseUrl;
    this._headers = options.headers;
    //this._authorization = this.headers["authorization"];
  }

  getInitialCards(id) {
    return fetch(`${this.baseUrl}/${id}`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getImageInfo(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo(path, id) {
    return fetch(`${this.baseUrl}/${path}/${id}`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getPromiseAll() {
    return Promise.all(
      this.getInitialCards(),
      this.getUserInfo(((path = "users"), (id = "me")))
    );
  }

  editProfile(path, id, fullName, profession) {
    fetch(`${this.baseUrl}/${path}/${id}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: fullName,
        about: profession,
      }),
    });
  }

  addImageToApi(path, placeName, imgLink) {
    return fetch(`${this.baseUrl}/${path}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: imgLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  belongsToMe(myId, cardId) {
    // this.getUserInfo("users", myId).then((response) => {
    //   console.log(response);
    // })
    // this.getImageInfo(cardId).then((response) => log.console(response));
  }

  removeImageFromAPI(path, cardId) {
    fetch(`${this.baseUrl}/${path}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  addLikeToAPI(path, cardId) {
    //https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    fetch(`${this.baseUrl}/${path}/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  removeLikeFromAPI(path, cardId) {
    //https://around.nomoreparties.co/v1/groupId/cards/likes/cardId

    fetch(`${this.baseUrl}/${path}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).catch((err) => {
      console.error(err);
    });
  }

  updateProfilePic(imgLink) {
    // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imgLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
