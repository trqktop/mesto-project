

//конфиг
//-------------------------------------------------------------------------------------------------------------------------------------------- 
//const api = new Api({
//    baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//    headers: {
//        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//        'Content-Type': 'application/json'
//    }
//});

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
            .then(res => checkResponse(res))

    }//3. Загрузка информации о пользователе с сервера


    pushProfileData(userName, userJob) {//эти данные передаются напрямую в метод
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: userName.value,
                about: userJob.value
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
        return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
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
                avatar: this.avatarSrc,
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


    putLikeOnServer() {
        return fetch(`${config.baseUrl}/cards/likes/${this.cardId}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(res => this.checkResponse(res))
    }//добавить карточку на сервер

    deleteLikeFromServer() {
        return fetch(`${this.baseUrl}/cards/likes/${this.cardId}`, {
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
//--------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------


//export default class Api {
//    constructor(){
//    переносим вксь апи сюда
//onrespone заприватить
//}
//}




















