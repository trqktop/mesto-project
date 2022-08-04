
export class Card {
    constructor({ data, api, userId, templateSelector, handleCardClick }) {
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
        this.handleCardClick(this.elementImage)
        return this.element
    }



    _likeButtonListener() {
        this.elementLike.addEventListener('click', () => {
            this._likeActive()
        })
    }


    _likeActive() {
        if (!this.elementLike.classList.contains('element__button_active')) {
            this.api.putLikeOnServer(this.cardId)
                .then(newCard => {
                    this.likes = newCard.likes
                    this._renderLikeCount()
                })
                .then(res => this.elementLike.classList.add('element__button_active'))
                .catch(err => console.log(err))
        }
        else {
            this.api.deleteLikeFromServer(this.cardId)
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
            this.api.requestToDeleteFromTheServer(this.cardId)
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
}





