
//import { fullScreenImage, fullScreenImageDescription, popupFullScreen } from './constants.js'
//import { openPopup } from './modal.js'
import { Api } from './api.js'
import { options } from './constants.js'

const api = new Api(options)

//-----
// export class Card {
//     constructor(, titleValue, userTemplateLi, cardFromServer, userId) {
//         this.cardElement = userTemplateLi.cloneNode(true)
//         this.elementImage = cardElement.querySelector('.element__image')
//     }

export class Card {
    constructor(srcValue, titleValue, userTemplateLi, cardFromServer, userId) {
        this._titleValue = titleValue;
        this._srcValue = srcValue;
        //this._cardSelector = cardSelector;
        this._userTemplateLi = userTemplateLi;
        this._cardFromServer = cardFromServer;
        this._userId = userId;
    }

    createCards() {
        const cardElement = this._userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную     
        const elementImage = cardElement.querySelector('.element__image')
        elementImage.setAttribute('src', this._srcValue) //установил аттрибут ссылки на картинку и задал источник
        elementImage.setAttribute('alt', this._titleValue)
        cardElement.querySelector('.element__caption-about').textContent = this._titleValue;// установил текст контент из источника
        //this._listenerFullScreenImage(elementImage, cardElement)
        this._renderLikeCount(this._cardFromServer, cardElement)
        this._likeButtonListener(cardElement, this._cardFromServer)
        this._checkCardOwn(this._cardFromServer, this._userId, cardElement)
        this._renderActiveLikes(this._userId, this._cardFromServer, cardElement)
        return cardElement
    }

    //  _insertCard() {
    //      this._elementsGridContainer.prepend(this._cardElement);//вставил копированную карточку в контейнер 
    //  }


    _likeButtonListener(cardElement, cardFromServer) {
        const like = cardElement.querySelector('.element__button')
        like.addEventListener('click', () => {
            this._likeActive(like, cardFromServer, cardElement)
        })
    }

    _likeActive(like, cardFromServer, cardElement) {
        if (!like.classList.contains('element__button_active')) {
            api.putLikeOnServer(cardFromServer._id)
                .then(newCard => this._renderLikeCount(newCard, cardElement))
                .then(res => like.classList.add('element__button_active'))
                .catch(err => console.log(err))
        }
        else {
            api.deleteLikeFromServer(cardFromServer._id)
                .then(newCard => this._renderLikeCount(newCard, cardElement))
                .then(res => like.classList.remove('element__button_active'))
                .catch(err => console.log(err))
        }
    }

    _renderLikeCount(cardFromServer, cardElement) {
        cardElement.querySelector('.element__like-count').textContent = cardFromServer.likes.length
    }


    _deleteCardButtonListener(cardElement, cardFromServer) {
        cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
            this.requestToDeleteFromTheServer(cardFromServer._id)
                .then(res => cardElement.remove())
                .catch(err => console.log(err))
        })
    }

    // В ПОПАПАХ 


    _checkCardOwn(cardFromServer, userId, cardElement) {// В ПОПАПАХ 
        if (cardFromServer.owner._id !== userId) {
            this._removeTrashIcon(cardElement)// В ПОПАПАХ 
        }
        else {
            this._deleteCardButtonListener(cardElement, cardFromServer)// В ПОПАПАХ 
        }// В ПОПАПАХ 
    }


    _renderActiveLikes(userId, card, cardElement) {
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

    _removeTrashIcon(cardElement) {// В ПОПАПАХ 
        cardElement.querySelector('.element__delete-button').style.display = "none"// В ПОПАПАХ 
    }
}// В ПОПАПАХ 





