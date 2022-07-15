
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    }
}//конфиг


export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}


export const getUserProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => checkResponse(res))

}//3. Загрузка информации о пользователе с сервера


export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => checkResponse(res))
}//загрузка карточек с сервера



export const pushProfileData = (userName, userJob) => {
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


export const pushNewCard = (nameValue, linkValue) => {
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


export const getUserId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => checkResponse(res))
}


export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => checkResponse(res))
}












export const requestToDeleteFromTheServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => checkResponse(res))
}










export const patchProfileAvatar = (avatarSrc) => {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarSrc,
        })
    })
        .then(res => checkResponse(res))
}



export const addOrRemoveLikeApi = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
        .then(res => checkResponse(res))

}



export const putLikeOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}//добавить карточку на сервер

export const deleteLikeFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}//добавить карточку на сервер




export const likeStatus = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}//добавить карточку на сервер


export const setProfileAvatar = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}