class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._getResponseData);
  }

  setUserInfo(resData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: resData.name,
        about: resData.about,
      }),
    }).then(this._getResponseData);
  }

  setUserAvatar(resData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: resData.avatar,
      }),
    }).then(this._getResponseData);
  }

  getCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponseData);
  }
}

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "055ca1f8-ffbd-428a-83a3-651882dda942",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

export default api;
