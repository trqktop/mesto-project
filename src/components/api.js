
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    }
}

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
}


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
}





export const pushProfileData = (userName, userJob) => {
    fetch(`${config.baseUrl}/users/me`, {
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
            console.log(res)
        })
        .catch(err => console.log(err))
}


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
}


export const renderLikeCount = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => res.json())
}




export const profileInfoId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => res.json())
}




export const checkOwnCard = (profile) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => res.json())
        .then(data => {
            const elementsArray = Array.from(document.querySelectorAll('.element'))
            data.reverse().forEach((item, index) => {
                if (item.owner._id !== profile._id) {
                    elementsArray[index].querySelector('.element__delete-button').remove()
                }
                else {
                    const deleteButton = elementsArray[index].querySelector('.element__delete-button')
                    deleteListener(deleteButton, item._id)
                }
            })
        })
}



function deleteListener(button, id) {
    button.addEventListener('click', (evt) => {
        if (evt.target) {
            deleteCardFromServer(id)
        }
    })
}

function deleteCardFromServer(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(res => res.json())
        .then(res => console.log(res))
}



export const likeId = (item) => {
    const likeArray = Array.from(document.querySelectorAll('.element__button'))
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => res.json())
        .then(res => findActiveLikeIndex(res, likeArray, item))
}


function findActiveLikeIndex(res, likeArray, item) {
    const activeIdLike = (res.reverse()[likeArray.indexOf(item)])
    if (item.classList.contains('element__button_active')) {
        deleteLikeActive(activeIdLike)
        addLikeCount(activeIdLike, item)
    } else if (!item.classList.contains('element__button_active')) {
        putLikeActive(activeIdLike)
        addLikeCount(activeIdLike, item)
    }
}


function deleteLikeActive(card) {
    fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => res.json())
}



function putLikeActive(card) {
    fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => res.json())

}

function addLikeCount(card, item) {
    item.parentNode.querySelector('span').textContent = card.likes.length
}



