import { Popup } from "./modal.js"

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        //this.render = super.openPopup()
        this.popupElement = selector
        this.fullScreenImageDescription = this.popupElement.querySelector('ásddas')

        // this.elementImage = this._getImage(cardElement)
        //this.selector = selector
        //  this.fullScreenImage = fullScreenImage

        //  this.fullScreenImageDescription = fullScreenImageDescription
        //  this.cardElement = cardElement
    }
    openPopup(cardElement, fullScreenImageDescription) {
        const elementImage = cardElement.querySelector('.element__image')//карточка
        this.popupElement.src/*карточка*/ = elementImage.src;// попап
        fullScreenImageDescription.textContent = cardElement.querySelector('.element__caption-about').textContent;
        this.popupElement.alt = elementImage.alt
        this._listenerFullScreenImage(elementImage, cardElement, () => {
        })
    }

    _listenerFullScreenImage(elementImage, cardElement, handler) {// В ПОПАПАХ 

        elementImage.addEventListener('click', () => {
            console.log(elementImage)
            super.openPopup()
        })
    }//

}
