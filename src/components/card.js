
import { fullScreenImage, fullScreenImageDescription, popupFullScreen } from './constants.js'
import { openPopup } from './modal.js'
import { putLikeOnServer, deleteLikeFromServer, requestToDeleteFromTheServer } from "./api.js"


function createCards(srcValue, titleValue, userTemplateLi, cardFromServer, userId) {
    const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    elementImage.setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
    listenerFullScreenImage(elementImage, cardElement)
    renderLikeCount(cardFromServer, cardElement)
    likeButtonListener(cardElement, cardFromServer)
    checkCardOwn(cardFromServer, userId, cardElement)
    renderActiveLikes(userId, cardFromServer, cardElement)
    return cardElement
}


function insertCard(elementsGridContainer, cardElement) {
    elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 
}

export const likeButtonListener = (cardElement, cardFromServer) => {
    const like = cardElement.querySelector('.element__button')
    like.addEventListener('click', () => {
        likeActive(like, cardFromServer, cardElement)
    })
}

function likeActive(like, cardFromServer, cardElement) {
    if (!like.classList.contains('element__button_active')) {
        putLikeOnServer(cardFromServer._id)
            .then(newCard => renderLikeCount(newCard, cardElement))
            .then(res => like.classList.add('element__button_active'))
            .catch(err => console.log(err))
    }
    else {
        deleteLikeFromServer(cardFromServer._id)
            .then(newCard => renderLikeCount(newCard, cardElement))
            .then(res => like.classList.remove('element__button_active'))
            .catch(err => console.log(err))
    }
}

export const renderLikeCount = (cardFromServer, cardElement) => {
    cardElement.querySelector('.element__like-count').textContent = cardFromServer.likes.length
}


export const deleteCardButtonListener = (cardElement, cardFromServer) => {
    cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
        requestToDeleteFromTheServer(cardFromServer._id)
            .then(res => cardElement.remove())
            .catch(err => console.log(err))
    })
}


function listenerFullScreenImage(elementImage, cardElement) {
    elementImage.addEventListener('click', function () {
        fullScreenImage.src = elementImage.src;
        fullScreenImageDescription.textContent = cardElement.querySelector('.element__caption-about').textContent;
        fullScreenImage.alt = elementImage.alt
        openPopup(popupFullScreen)
    })
}


export const checkCardOwn = (cardFromServer, userId, cardElement) => {
    //const deleteArrayButton = document.querySelectorAll('.element__delete-button')
    console.log(cardFromServer.owner._id, userId)
    if (cardFromServer.owner._id !== userId) {
        removeTrashIcon(cardElement)
    }
    else {
        deleteCardButtonListener(cardElement, cardFromServer)
    }
}


export const renderActiveLikes = (userId, card, cardElement) => {
    const like = cardElement.querySelector('.element__button')
    card.likes.forEach(owner => {
        if (owner._id === userId) {
            like.classList.add('element__button_active')
        }
        else {
            like.classList.remove('element__button_active')
        }
    })
}

export const removeTrashIcon = (cardElement) => {
    cardElement.querySelector('.element__delete-button').style.display = "none"
}

export { insertCard, createCards }