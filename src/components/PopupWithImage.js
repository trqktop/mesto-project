import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this.popupElement = selector
        this.popupFullscreenImage = this.popupElement.querySelector('.popup__fullscreen-image')
        this.popupDescription = this.popupElement.querySelector('.popup__caption')
    }
    open(card) {
        super.openPopup()
        this.popupFullscreenImage.src = card.link
        this.popupFullscreenImage.alt = card.link
        this.popupDescription.textContent = card.name
    }
}
