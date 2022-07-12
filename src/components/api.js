
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    }
}//конфиг







export const getUserProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}//3. Загрузка информации о пользователе с сервера


export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}//загрузка карточек с сервера





export const pushProfileData = (userName, userJob) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName.textContent,
            about: userJob.textContent
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then(res => {
            res.name = userName.textContent
            res.about = userJob.textContent
        })
        .catch(err => console.log(err))
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
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch(err => console.log(err))
}//загрузка созданной карточки на сервер

export const setLikesCount = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}

export const userId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then(res => res._id)
}
export const checkCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}







export const checkCardOwn = (array, userID) => {
    const deleteArrayButton = document.querySelectorAll('.element__delete-button')
    array.forEach((item, index) => {
        if (item.owner._id === userID) {
            setTrashIcon(index, deleteArrayButton)
            deleteFromServerListener(deleteArrayButton, index, item)
        }
    })
}


export const setTrashIcon = (index, arr) => {
    arr[index].style.display = "block"
}

function deleteFromServerListener(detelButton, index, cardsFromServer) {
    detelButton[index].addEventListener('click', () => { requestToDeleteFromTheServer(cardsFromServer._id) })
}


export const requestToDeleteFromTheServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then(res => res._id)
        .catch(err => console.log(err))
}


export const putOnServerLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch(err => console.log(err))
}



export const deleteFromServerLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch(err => console.log(err))
}


export const checkLikeToggle = (serverItems) => {
    const likesArr = Array.from(document.querySelectorAll('.element__button'))
    let statusTracker = true;
    likesArr.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (statusTracker) {
                updateLikeCount()
                putOnServerLike(serverItems[index]._id)
                return statusTracker = false;
            } else {
                updateLikeCount()
                deleteFromServerLike(serverItems[index]._id)
                return statusTracker = true;
            }
        })
    })
}


export const updateLikeCount = () => {
    setLikesCount()
        .then(serverItems => serverItems)
        .then(serverItems =>
            initLikes(serverItems)
        )
}

export const initLikes = (serverItems) => {
    const arrLikeCount = Array.from(document.querySelectorAll('.element__like-count'))
    renderLikes(arrLikeCount, serverItems)
}

const renderLikes = (arrHtmlElements, arrServerElements) => {
    arrServerElements.reverse().forEach((item, index) => {
        arrHtmlElements[index].textContent = item.likes.length
    })
}



export const patchProfileAvatar = (avatarSrc) => {
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarSrc,
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
}