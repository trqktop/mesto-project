
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    }
}//конфиг
//-------------------------------------------------------------------------------------------------------------------------------------------- 
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
    }
});

export class Api {
    constructor(options) {
        this.profileNameInput = options.profileNameInput;
        this.profileJobInput = options.profileJobInput
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
        return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
            .then(res => checkResponse(res))

    }//3. Загрузка информации о пользователе с сервера


    pushProfileData(userName, userJob) {
        return fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: userName.value,
                about: userJob.value
            })
        })
            .then(res => checkResponse(res))
    }//5. Редактирование профиля на сервере


    pushNewCard(nameValue, linkValue) {
        return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
        })
            .then(res => checkResponse(res))
    }//загрузка созданной карточки на сервер


    getUserId() {
        return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
            .then(res => checkResponse(res))
    }


    //    getCard() {
    //        return fetch(`${config.baseUrl}/cards`, {
    //            headers: config.headers
    //        })
    //            .then(res => checkResponse(res))
    //    }

    requestToDeleteFromTheServer(cardId) {
        return fetch(`${config.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
            .then(res => checkResponse(res))
    }

    patchProfileAvatar(avatarSrc) {
        return fetch(`${config.baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar: avatarSrc,
            })
        })
            .then(res => checkResponse(res))
    }


    addOrRemoveLikeApi() {
        return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers,
        })
            .then(res => checkResponse(res))
    }


    putLikeOnServer(cardId) {
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: config.headers,
        })
            .then(res => checkResponse(res))
    }//добавить карточку на сервер

    deleteLikeFromServer(cardId) {
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: config.headers,
        })
            .then(res => checkResponse(res))
    }//добавить карточку на сервер


    likeStatus() {
        return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers,
        })
            .then(res => checkResponse(res))
    }//добавить карточку на сервер


    setProfileAvatar() {
        return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers,
        })
            .then(res => checkResponse(res))
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




















