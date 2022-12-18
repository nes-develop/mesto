class Api {
    constructor({ baseUrl, headers }) {
        // тело конструктора
        this._headers = headers;
        this._baseUrl = baseUrl;
    }
    ////метод api для получения данных сервера об имени
    getUserInfo() {
        //возвращаем запрос
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    //метод api для получения карточек с сервера
    getInitialCards() {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // метод api для корректировки профиля и отправки на сервер методом PATCH
    editUserInfo(name, about) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/users/me`, {
            //меняем на сервере
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // метод api для корректировки профиля и отправки на сервер методом POST
    addCard(name, link) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards`, {
            //меняем на сервере
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }


    // метод api для удаления карточки с сервера  методом DELETE, id карточки подставляем через шаблон
    deleteCard(id) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards/${id}`, {
            //меняем на сервере
            method: "DELETE",
            headers: this._headers

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // метод api для удаления лайка с сервера  методом DELETE, id карточки подставляем через шаблон
    deleteLike(id) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            //меняем на сервере
            method: "DELETE",
            headers: this._headers

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }


    // метод api для лайка с сервера  методом PUT, id карточки подставляем через шаблон
    addLike(id) {
        //возвращаем запрос  
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            //меняем на сервере
            method: "PUT",
            headers: this._headers

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // метод api для смены аватар методом PATCH, id карточки подставляем через шаблон
    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

}





export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '632a292c-702b-4f7c-9817-28c49bfdab1f',
        'Content-Type': 'application/json'
    }
}); 