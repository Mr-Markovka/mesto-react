
class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this.headers = headers;
    }

    getInfoUser() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

}

const config = {

    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
    authorization: '055ca1f8-ffbd-428a-83a3-651882dda942',
    'Content-Type': 'application/json'
    }
};

const api = new Api(config);

export default api;