import { popupFullScreen, fullScreenCloseButton } from './constants.js'
import { openPopup, closePopup } from './modal.js'

function createCards(srcValue, titleValue, userTemplateLi) {
    const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    elementImage.setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника


    likeButtonListener(cardElement)
    deleteCardButtonListener(cardElement)

    listenerFullScreenImage(elementImage, cardElement)
    listenerCloseFullScreenImage()
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
    cardElement.querySelector('.element__delete-button').addEventListener('click', () =>
        cardDelete(cardElement))
}

function cardDelete(cardElement) {
    cardElement.remove()
}




function listenerFullScreenImage(elementImage, cardElement) {
    elementImage.addEventListener('click', function () {

        popupFullScreen.querySelector('.popup__fullscreen-image').src = elementImage.src;
        popupFullScreen.querySelector('.popup__caption').textContent = cardElement.querySelector('.element__caption-about').textContent;
        popupFullScreen.querySelector('.popup__fullscreen-image').alt = elementImage.alt
        openPopup(popupFullScreen)
    })
}

function listenerCloseFullScreenImage() {
    fullScreenCloseButton.addEventListener('click', () => closePopup(popupFullScreen))

}


export { insertCard, createCards }