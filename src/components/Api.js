class Api {
    constructor({ baseUrl, headers }) {
        // тело конструктора
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getProfile() {
        //возвращаем запрос
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    getInitialCards() {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards `, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // другие методы работы с API
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '632a292c-702b-4f7c-9817-28c49bfdab1f',
        'Content-Type': 'application/json'
    }
}); 