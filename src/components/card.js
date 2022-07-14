
import { fullScreenImage, fullScreenImageDescription, popupFullScreen, fullScreenCloseButton } from './constants.js'
import { openPopup, closePopup } from './modal.js'
import { putLikeOnServer, deleteLikeFromServer, addOrRemoveLikeApi, checkCards, requestToDeleteFromTheServer, likeStatus } from "./api.js"



function createCards(srcValue, titleValue, userTemplateLi) {
    const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    elementImage.setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
    listenerFullScreenImage(elementImage, cardElement)
    return cardElement
}







function insertCard(elementsGridContainer, cardElement, cardFromServer) {
    elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 
    deleteCardButtonListener(cardElement)
    renderLikeCount(cardFromServer, cardElement)
    likeButtonListener(cardElement, cardFromServer)
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
            .then(changedCard => changedCard)
            .then(changedCard => renderLikeCount(changedCard, cardElement))
            .then(res => like.classList.add('element__button_active'))
    }
    else {
        deleteLikeFromServer(cardFromServer._id)
            .then(changedCard => changedCard)
            .then(changedCard => renderLikeCount(changedCard, cardElement))
            .then(res => like.classList.remove('element__button_active'))
    }
}


export const renderLikeCount = (cardFromServer, cardElement) => {
    cardElement.querySelector('.element__like-count').textContent = cardFromServer.likes.length
}




export const deleteCardButtonListener = (cardElement) => {
    cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
        cardDelete(cardElement)
    })
}

function cardDelete(cardElement) {
    cardElement.remove()
}







function listenerFullScreenImage(elementImage, cardElement) {
    elementImage.addEventListener('click', function () {
        fullScreenImage.src = elementImage.src;
        fullScreenImageDescription.textContent = cardElement.querySelector('.element__caption-about').textContent;
        fullScreenImage.alt = elementImage.alt
        openPopup(popupFullScreen)
    })
}



export const checkCardOwn = (card, cardsFromServer, userID, index, ownerId, cardElement) => {
    //const deleteArrayButton = document.querySelectorAll('.element__delete-button')
    if (ownerId !== userID) {
        removeTrashIcon(cardElement)
    }
    else {
        deleteFromServerListener(card, cardElement)
    }
}


export const renderActiveLikes = (cards, userId, card, cardElement) => {
    card.likes.forEach(owner => {
        if (owner._id === userId) {
            cardElement.querySelector('.element__button').classList.add('element__button_active')
        }
        else {
            cardElement.querySelector('.element__button').classList.remove('element__button_active')
        }
    })
}


export const deleteFromServerListener = (card, cardElement) => {
    cardElement.querySelector('.element__delete-button').addEventListener('click', () => { requestToDeleteFromTheServer(card._id) })
}


export const removeTrashIcon = (cardElement) => {
    cardElement.querySelector('.element__delete-button').style.display = "none"
}








export { cardDelete, insertCard, createCards }