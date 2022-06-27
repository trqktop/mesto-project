import { popupFunctions } from "./modal.js"
export const card = (() => {
    const popupFullScreen = document.querySelector('.popup__fullscreen')
    const fullScreenCloseButton = popupFullScreen.querySelector('.popup__close-button')
    const nameImageInput = document.querySelector('#nameImageInput')//поля ввода - имя картинки
    const urlImageInput = document.querySelector('#urlImageInput')//поля ввода - ссылка на картинку
    const formNewPhoto = document.querySelector('#formNewPhoto')
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];//массив карточек
    return {
        data: { initialCards, nameImageInput, urlImageInput, formNewPhoto, fullScreenCloseButton },
        render: {
            createCards: (srcValue, titleValue) => {
                const userTemplate = document.querySelector('.template').content;//ищем на страницу template с его контентом
                const userTemplateLi = userTemplate.querySelector('li');//берем контейнер для копирования 
                const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
                const elementImage = cardElement.querySelector('.element__image')
                elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
                elementImage.setAttribute('alt', titleValue)
                cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
                card.render.listenerFullScreenImage(elementImage, cardElement)
                card.render.deleteCardButtonListener(cardElement)
                card.render.likeButtonListener(cardElement)
                card.render.listenerCloseFullScreenImage()
                return cardElement
            },
            insertCard: (cardElement) => {
                const elementsGridContainer = document.querySelector('.elements__grid-container')//контейнер для вставки ли блока
                elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 
            },
            likeActive: (item) => {
                item.classList.toggle('element__button_active')
            },
            likeButtonListener: (cardElement) => {
                cardElement.querySelector('.element__button').addEventListener('click', () => card.render.likeActive(cardElement.querySelector('.element__button'))
                )
            },
            cardDelete: (element) => {
                element.remove()
            },
            deleteCardButtonListener: (cardElement) => {
                cardElement.querySelector('.element__delete-button').addEventListener('click', () =>
                    card.render.cardDelete(cardElement))
            },
            listenerFullScreenImage: (elementImage, cardElement) => {
                elementImage.addEventListener('click', function () {
                    popupFullScreen.querySelector('.popup__fullscreen-image').src = elementImage.src;
                    popupFullScreen.querySelector('.popup__caption').textContent = cardElement.querySelector('.element__caption-about').textContent;
                    popupFullScreen.querySelector('.popup__fullscreen-image').alt = elementImage.alt
                    popupFunctions.render.openPopup(popupFullScreen)
                })
            },
            listenerCloseFullScreenImage: () => {
                fullScreenCloseButton.addEventListener('click', () => popupFunctions.render.closePopup(popupFullScreen))

            }

        }
    }
})()



















export const addNewCardOnPage = (() => {
    const profileAddCardButton = document.querySelector('.profile__add-button')
    const popupAddNewPhoto = document.querySelector('#popupMesto')
    const popupNewPhotoCloseButton = popupAddNewPhoto.querySelector('#mestoCloseButton')

    return {
        data: { profileAddCardButton, popupAddNewPhoto, popupNewPhotoCloseButton },
        render: {}
    }
})()

