
import { fullScreenImage, fullScreenImageDescription, popupFullScreen, fullScreenCloseButton } from './constants.js'
import { openPopup, closePopup } from './modal.js'
import { checkCards } from "./api.js"



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
    cardElement.querySelector('.element__button').addEventListener('click', () => likeActive(cardElement.querySelector('.element__button'))
    )
}

function likeActive(item) {
    item.classList.toggle('element__button_active')
}











function deleteCardButtonListener(cardElement) {
    cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
        cardDelete(cardElement)
    })
}

function cardDelete(cardElement) {
    cardElement.remove()
}



const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
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




export { cardDelete, insertCard, createCards }