
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
    constructor(data, userId, templateSelector) {
        this.data = data
        this.name = data.name
        this.link = data.link
        this.owner = data.owner._id
        this.templateSelector = templateSelector
        this.cardId = data._id
        this.likes = data.likes
        this.userId = userId
    }


    _getElement() {
        return document
            .querySelector(this.templateSelector)
            .content
            .querySelector('li')
            .cloneNode(true)
    }

    generate() {
        this.element = this._getElement()
        this.elementImage = this.element.querySelector('.element__image')
        this.elementCaption = this.element.querySelector('.element__caption-about')
        this.elementLike = this.element.querySelector('.element__button')
        this.elementLikeCount = this.element.querySelector('.element__like-count')
        this.elementDeleteButton = this.element.querySelector('.element__delete-button')
        this.elementCaption.textContent = this.name;
        this.elementImage.setAttribute('src', this.link)
        this.elementImage.setAttribute('alt', this.name)
        this._renderLikeCount()
        this._likeButtonListener()
        this._checkCardOwn()
        this._renderActiveLikesFromDom()
        return this.element
    }



    _likeButtonListener() {
        this.elementLike.addEventListener('click', () => {
            this._likeActive()
        })
    }


    _likeActive() {
        if (!this.elementLike.classList.contains('element__button_active')) {
            api.putLikeOnServer(this.cardId)
                .then(newCard => {
                    this.likes = newCard.likes
                    this._renderLikeCount()
                })
                .then(res => this.elementLike.classList.add('element__button_active'))
                .catch(err => console.log(err))
        }
        else {
            api.deleteLikeFromServer(this.cardId)
                .then(newCard => {
                    this.likes = newCard.likes
                    this._renderLikeCount(newCard)
                })
                .then(res => this.elementLike.classList.remove('element__button_active'))
                .catch(err => console.log(err))
        }
    }

    _renderLikeCount() {
        this.elementLikeCount.textContent = this.likes.length
    }


    _deleteCardButtonListener() {
        this.elementDeleteButton.addEventListener('click', () => {
            api.requestToDeleteFromTheServer(this.cardId)
                .then(res => {
                    console.log(this.element)
                    this.element.remove()
                })
                .catch(err => console.log(err))
        })
    }


    _checkCardOwn() {
        if (this.owner !== this.userId) {
            this._removeTrashIconFromDom()
        }
        else {
            this._deleteCardButtonListener()
        }
    }


    _removeTrashIconFromDom() {
        this.elementDeleteButton.style.display = "none"
    }

    _renderActiveLikesFromDom() {
        this.likes.forEach(owner => {
            if (owner._id === this.userId) {
                this.elementLike.classList.add('element__button_active')
            }
            else {
                this.elementLike.classList.remove('element__button_active')
            }
        })
    }

    // constructor(srcValue, titleValue, userTemplateLi, cardFromServer, userId) {
    //     this._titleValue = titleValue;
    //     this._srcValue = srcValue;
    //     //this._cardSelector = cardSelector;
    //     this._userTemplateLi = userTemplateLi;
    //     this._cardFromServer = cardFromServer;
    //     this._userId = userId;
    //    // this.handleCardClick()
    // }
    //// getTemplate() {
    ////     this._userTemplateLi
    //// }
    // createCards() {
    //     const cardElement = this._userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную     
    //     const elementImage = cardElement.querySelector('.element__image')
    //     elementImage.setAttribute('src', this._srcValue) //установил аттрибут ссылки на картинку и задал источник
    //     elementImage.setAttribute('alt', this._titleValue)
    //     cardElement.querySelector('.element__caption-about').textContent = this._titleValue;// установил текст контент из источника
    //     //this._listenerFullScreenImage(elementImage, cardElement)
    //     this._renderLikeCount(this._cardFromServer, cardElement)
    //     this._likeButtonListener(cardElement, this._cardFromServer)
    //     this._checkCardOwn(this._cardFromServer, this._userId, cardElement)
    //     this._renderActiveLikes(this._userId, this._cardFromServer, cardElement)
    //
    //     return cardElement
    // }
    //
    // //  _insertCard() {
    // //      this._elementsGridContainer.prepend(this._cardElement);//вставил копированную карточку в контейнер 
    // //  }
    //
    //
    // _likeButtonListener(cardElement, cardFromServer) {
    //     const like = cardElement.querySelector('.element__button')//like
    //     like.addEventListener('click', () => {
    //         this._likeActive(like, cardFromServer, cardElement)
    //     })
    // }
    //
    // _likeActive(like, cardFromServer, cardElement) {
    //     if (!like.classList.contains('element__button_active')) {
    //         api.putLikeOnServer(cardFromServer._id)
    //             .then(newCard => this._renderLikeCount(newCard, cardElement))
    //             .then(res => like.classList.add('element__button_active'))//like
    //             .catch(err => console.log(err))
    //     }
    //     else {
    //         api.deleteLikeFromServer(cardFromServer._id)
    //             .then(newCard => this._renderLikeCount(newCard, cardElement))
    //             .then(res => like.classList.remove('element__button_active'))
    //             .catch(err => console.log(err))
    //     }
    // }
    //
    // _renderLikeCount(cardFromServer, cardElement) {
    //     cardElement.querySelector('.element__like-count').textContent = cardFromServer.likes.length
    // }
    //
    //
    // _deleteCardButtonListener(cardElement, cardFromServer) {
    //     cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
    //         api.requestToDeleteFromTheServer(cardFromServer._id)
    //             .then(res => cardElement.remove())
    //             .catch(err => console.log(err))
    //     })
    // }
    //
    // // В ПОПАПАХ 
    //
    //
    // _checkCardOwn(cardFromServer, userId, cardElement) {// В ПОПАПАХ 
    //     if (cardFromServer.owner._id !== userId) {
    //         this._removeTrashIcon(cardElement)// В ПОПАПАХ 
    //     }
    //     else {
    //         this._deleteCardButtonListener(cardElement, cardFromServer)// В ПОПАПАХ 
    //     }// В ПОПАПАХ 
    // }
    //
    //
    // _renderActiveLikes(userId, card, cardElement) {
    //     const like = cardElement.querySelector('.element__button')
    //     card.likes.forEach(owner => {
    //         if (owner._id === userId) {
    //             like.classList.add('element__button_active')
    //         }
    //         else {
    //             like.classList.remove('element__button_active')
    //         }
    //     })
    // }
    //
    // _removeTrashIcon(cardElement) {// В ПОПАПАХ 
    //     cardElement.querySelector('.element__delete-button').style.display = "none"// В ПОПАПАХ 
    // }
}// В ПОПАПАХ 





