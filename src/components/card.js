
//import { fullScreenImage, fullScreenImageDescription, popupFullScreen } from './constants.js'
//import { openPopup } from './modal.js'
//import { putLikeOnServer, deleteLikeFromServer, requestToDeleteFromTheServer } from "./api.js"

//-----
// export class Card {
//     constructor(srcValue, titleValue, userTemplateLi, cardFromServer, userId) {
//         this.cardElement = userTemplateLi.cloneNode(true)
//         this.elementImage = cardElement.querySelector('.element__image')
//     }

//----
export class Card {
    constructor(srcValue, titleValue, userTemplateLi, cardFromServer, userId, elementsGridContainer) {
        this._titleValue = titleValue;
        this._srcValue = srcValue;
        //this._cardSelector = cardSelector;
        this._userTemplateLi = userTemplateLi;
        this._cardFromServer = cardFromServer;
        this._userId = userId;
        this._elementsGridContainer = elementsGridContainer
        this._cardElement = this.createCards()
    }
    createCards() {
        const cardElement = this._userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную     
        const elementImage = cardElement.querySelector('.element__image')
        elementImage.setAttribute('src', this._srcValue) //установил аттрибут ссылки на картинку и задал источник
        elementImage.setAttribute('alt', this._titleValue)
        cardElement.querySelector('.element__caption-about').textContent = this._titleValue;// установил текст контент из источника
        this.listenerFullScreenImage(elementImage, cardElement)
        this.renderLikeCount(this._cardFromServer, cardElement)
        this.likeButtonListener(cardElement, this._cardFromServer)
        this.checkCardOwn(this._cardFromServer, this._userId, cardElement)
        this.renderActiveLikes(this._userId, this._cardFromServer, cardElement)
        return cardElement
    }

    insertCard() {
        this._elementsGridContainer.prepend(this._cardElement);//вставил копированную карточку в контейнер 
    }


    likeButtonListener(cardElement, cardFromServer) {
        const like = cardElement.querySelector('.element__button')
        like.addEventListener('click', () => {
            likeActive(like, cardFromServer, cardElement)
        })
    }

    likeActive(like, cardFromServer, cardElement) {
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

    renderLikeCount(cardFromServer, cardElement) {
        cardElement.querySelector('.element__like-count').textContent = cardFromServer.likes.length
    }


    deleteCardButtonListener(cardElement, cardFromServer) {
        cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
            this.requestToDeleteFromTheServer(cardFromServer._id)
                .then(res => cardElement.remove())
                .catch(err => console.log(err))
        })
    }


    listenerFullScreenImage(elementImage, cardElement) {
        elementImage.addEventListener('click', function () {
            fullScreenImage.src = elementImage.src;
            fullScreenImageDescription.textContent = cardElement.querySelector('.element__caption-about').textContent;
            fullScreenImage.alt = elementImage.alt
            openPopup(popupFullScreen)
        })
    }


    checkCardOwn(cardFromServer, userId, cardElement) {
        //const deleteArrayButton = document.querySelectorAll('.element__delete-button')
        if (cardFromServer.owner._id !== userId) {
            this.removeTrashIcon(cardElement)
        }
        else {
            this.deleteCardButtonListener(cardElement, cardFromServer)
        }
    }


    renderActiveLikes(userId, card, cardElement) {
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

    removeTrashIcon(cardElement) {
        cardElement.querySelector('.element__delete-button').style.display = "none"
    }
}





