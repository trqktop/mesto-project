
import { fullScreenImage, fullScreenImageDescription, popupFullScreen, fullScreenCloseButton } from './constants.js'
import { openPopup, closePopup } from './modal.js'
import { putLikeOnServer, deleteLikeFromServer, addOrRemoveLikeApi, checkCards, requestToDeleteFromTheServer, likeStatus } from "./api.js"



function createCards(srcValue, titleValue, userTemplateLi) {
    const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    elementImage.setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
    likeButtonListener(cardElement)
    deleteCardButtonListener(cardElement)
    listenerFullScreenImage(elementImage, cardElement)
    return cardElement
}







function insertCard(elementsGridContainer, cardElement) {
    elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 
}

function likeButtonListener(cardElement) {
    cardElement.querySelector('.element__button').addEventListener('click', () => {
        likeActive(cardElement.querySelector('.element__button'))
    })
}

function likeActive(item) {
    if (!item.classList.contains('element__button_active')) {
        return item.classList.add('element__button_active')
    } else {
        return item.classList.remove('element__button_active')
    }
}









function deleteCardButtonListener(cardElement) {
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



export const checkCardOwn = (array, userID) => {
    const deleteArrayButton = document.querySelectorAll('.element__delete-button')
    array.forEach((item, index) => {
        if (item.owner._id !== userID) {
            setTrashIcon(index, deleteArrayButton)
        }
        deleteFromServerListener(deleteArrayButton, index, item)
    })
}

function deleteFromServerListener(detelButton, index, cardsFromServer) {
    detelButton[index].addEventListener('click', () => { requestToDeleteFromTheServer(cardsFromServer._id) })
}


export const setTrashIcon = (index, arr) => {
    arr[index].style.display = "none"
}


export const initLikeCount = (serverArr) => {
    const likeCount = Array.from(document.querySelectorAll('.element__like-count'))
    renderLikeCount(likeCount, serverArr)
}


export const renderLikeCount = (likeCount, serverArr) => {
    likeCount.reverse().forEach((likeCountElement, index) => {
        likeCountElement.textContent = serverArr[index].likes.length
    })
}
export const plusLikeCount = (likeItem) => {
    return likeItem.closest('figcaption').querySelector('span').textContent = parseInt(likeItem.closest('figcaption').querySelector('span').textContent) + 1

}
export const minusLikeCount = (likeItem) => {
    return likeItem.closest('figcaption').querySelector('span').textContent = parseInt(likeItem.closest('figcaption').querySelector('span').textContent) - 1
}

export { cardDelete, insertCard, createCards }