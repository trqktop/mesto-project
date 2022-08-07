
export class Api {
    constructor(options) {//в опции передаются только юрл и хедер
        this.baseUrl = options.baseUrl
        this.headers = options.headers
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => this.checkResponse(res))
    }//загрузка карточек с сервера

    getUserProfileInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => this.checkResponse(res))

    }//3. Загрузка информации о пользователе с сервера


    pushProfileData(userName, userJob) {//эти данные передаются напрямую в метод
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: userName,
                about: userJob
            })
        })
            .then(res => this.checkResponse(res))
    }//5. Редактирование профиля на сервере


    pushNewCard(nameValue, linkValue) {//эти данные передаются напрямую в метод
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
        })
            .then(res => this.checkResponse(res))
    }//загрузка созданной карточки на сервер


    getUserId() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => this.checkResponse(res))
    }


    getCard() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => checkResponse(res))
    }

    requestToDeleteFromTheServer(cardId) {//эти данные передаются напрямую в метод
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this.checkResponse(res))
    }

    patchProfileAvatar(avatarSrc) {//эти данные передаются напрямую в метод
        return fetch(`${this.baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarSrc,
            })
        })
            .then(res => this.checkResponse(res))
    }


    addOrRemoveLikeApi() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
            .then(res => this.checkResponse(res))
    }


    putLikeOnServer(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(res => this.checkResponse(res))
    }//добавить карточку на сервер

    deleteLikeFromServer(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => this.checkResponse(res))
    }//добавить карточку на сервер


    likeStatus() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
            .then(res => this.checkResponse(res))
    }//добавить карточку на сервер


    setProfileAvatar() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
            .then(res => this.checkResponse(res))
    }


    checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}
