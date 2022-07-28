

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector, fullScreenImage, elementImage, fullScreenImageDescription, cardElement)
        this.selector = selector
        this.fullScreenImage = fullScreenImage
        this.elementImage = elementImage
        this.fullScreenImageDescription = fullScreenImageDescription
        this.cardElement = cardElement
    }
    openPopup() {
        fullScreenImage.src = elementImage.src;
        fullScreenImageDescription.textContent = cardElement.querySelector('.element__caption-about').textContent;
        fullScreenImage.alt = elementImage.alt
    }
}

