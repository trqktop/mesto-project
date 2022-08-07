
export class Card {
    constructor({ data, api, userId, templateSelector, handleCardClick, handleCardDeleteButtonListener, handleCardlikeButtonListenerActive, handleCardlikeButtonListenerDelete }) {
        this.api = api
        this.data = data
        this.name = data.name
        this.link = data.link
        this.owner = data.owner._id
        this.templateSelector = templateSelector
        this.cardId = data._id
        this.likes = data.likes
        this.userId = userId
        this.handleCardClick = handleCardClick
        this.handleCardDeleteButtonListener = handleCardDeleteButtonListener
        this.handleCardlikeButtonListenerActive = handleCardlikeButtonListenerActive
        this.handleCardlikeButtonListenerDelete = handleCardlikeButtonListenerDelete
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
        this._checkOwnCard()
        this._renderLikeCount()
        // this._likeButtonListener()
        this._renderActiveLikesFromDom()
        this._setEventListener()
        return this.element
    }

    _setEventListener() {
        this.elementImage.addEventListener('click', () => {
            this.handleCardClick()
        })

        this.elementDeleteButton.addEventListener('click', () => {
            if (this._checkOwnCard())
                this.handleCardDeleteButtonListener(this.element, this.cardId)
        })
        this.elementLike.addEventListener('click', () => {

            if (!this.elementLike.classList.contains('element__button_active')) {
                this.handleCardlikeButtonListenerActive(this.cardId, this.elementLike, this.elementLikeCount)
            }
            else {
                this.handleCardlikeButtonListenerDelete(this.cardId, this.elementLike, this.elementLikeCount)
            }
        })
    }


    _checkOwnCard() {
        if (this.owner === this.userId)
            return true
        else {
            this._removeTrashIconFromDom()
        }
    }

    _renderLikeCount() {
        this.elementLikeCount.textContent = this.likes.length
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
}





