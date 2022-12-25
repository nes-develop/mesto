class Api {
    constructor({ baseUrl, headers }) {
        // тело конструктора
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    //метод для отработки ошибок
    _getResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    ////метод api для получения данных сервера об имени
    getUserInfo() {
        //возвращаем запрос
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,

        })
            .then(res => this._getResponse(res))
    }

    //метод api для получения карточек с сервера
    getInitialCards() {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._getResponse(res))
    }

    // метод api для корректировки профиля и отправки на сервер методом PATCH
    editUserInfo(data) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/users/me`, {
            //меняем на сервере
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job,
                // avatar: data.avatar
            })

        })
            .then(res => this._getResponse(res))
    }

    // метод api для корректировки профиля и отправки на сервер методом POST
    addCard(item) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards`, {
            //меняем на сервере
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })

        })
            .then(res => this._getResponse(res))
    }


    // метод api для удаления карточки с сервера  методом DELETE, id карточки подставляем через шаблон
    deleteCard(cardId) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            //меняем на сервере
            method: "DELETE",
            headers: this._headers

        })
            .then(res => this._getResponse(res))
    }

    // метод api для удаления лайка с сервера  методом DELETE, id карточки подставляем через шаблон
    deleteLike(cardId) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            //меняем на сервере
            method: "DELETE",
            headers: this._headers

        })
            .then(res => this._getResponse(res))
    }


    // метод api для лайка с сервера  методом PUT, id карточки подставляем через шаблон
    addLike(cardId) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            //меняем на сервере
            method: "PUT",
            headers: this._headers

        })
            .then(res => this._getResponse(res)
            )
    }

    // метод api для смены аватар методом PATCH, id карточки подставляем через шаблон
    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
                // avatar
            })
        })
            .then(res => this._getResponse(res)
            )
    }

}





export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '632a292c-702b-4f7c-9817-28c49bfdab1f',
        'Content-Type': 'application/json'
    }
}); 