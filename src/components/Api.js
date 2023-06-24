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

  // Cards should be rendered after the user info is received from the server
  // Create a function in Api.js and return the Promise.all() method
  // Pass the array of function calls for getting user information and the list of cards to Promise.all() as a parameter

  /*
  getUserInfo() {
    const userBaseUrl = this.baseUrl.replace("cards", "users/me");
    return fetch(userBaseUrl, {
      headers: {
        authorization: this._authorization,
      },
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

  // other methods for working with the API
  printOptions() {
    console.log(this.baseUrl);
    console.log(this.headers);
    console.log(this.authorization);
  }

  */
}
