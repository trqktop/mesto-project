import { Api } from './api.js'
import { options } from './constants.js'
const api = new Api(options)

export class CardNew {
    constructor({ data, userId, templateSelector }) {
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
        this._renderActiveLikes()
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
                .then(newCard => this._renderLikeCount())
                .then(res => this.elementLike.classList.add('element__button_active'))
                .catch(err => console.log(err))
        }
        else {
            api.deleteLikeFromServer(this.cardId)
                .then(newCard => this._renderLikeCount(newCard))
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
                .then(res => this.element.remove())
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
            if (owner._id === userId) {
                this.elementLike.classList.add('element__button_active')
            }
            else {
                this.elementLike.classList.remove('element__button_active')
            }
        })
    }

}
