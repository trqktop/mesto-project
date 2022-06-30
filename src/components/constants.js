const openPopupProfileEditButton = document.querySelector('.profile__edit-button')
const popupSubmitProfileForm = document.querySelector('.popup__edit-form')
const popupProfileEdit = document.querySelector('#popupEditProfile')//по-пап редактировать профиль 
const closePopupProfileEdit = popupProfileEdit.querySelector('.popup__close-button')
const profile = document.querySelector('.profile')//секция профиль
const profileJobInput = popupProfileEdit.querySelector('#profileJobInput')//input профиль профессия
const profileUserJob = profile.querySelector('.profile__user-about');//профиль профессия
const profileNameInput = popupProfileEdit.querySelector('#profileNameInput');//input профиль имя
const profileUserName = profile.querySelector('.profile__user-name');//профиль имя


const popupArr = Array.from(document.querySelectorAll('.popup'))
const formArr = Array.from(document.querySelectorAll('form'))

const errorList = Array.from(document.querySelectorAll('.error'))

const profileAddCardButton = document.querySelector('.profile__add-button')
const popupAddNewPhoto = document.querySelector('#popupMesto')
const popupNewPhotoCloseButton = popupAddNewPhoto.querySelector('#mestoCloseButton')


const popupFullScreen = document.querySelector('.popup__fullscreen')
const fullScreenCloseButton = popupFullScreen.querySelector('.popup__close-button')
const nameImageInput = document.querySelector('#nameImageInput')//поля ввода - имя картинки
const urlImageInput = document.querySelector('#urlImageInput')//поля ввода - ссылка на картинку
const formNewPhoto = document.querySelector('#formNewPhoto')
const elementsGridContainer = document.querySelector('.elements__grid-container')//контейнер для вставки ли блока
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



const userTemplate = document.querySelector('.template').content;//ищем на страницу template с его контентом
const userTemplateLi = userTemplate.querySelector('li');//берем контейнер для копирования 

const enableValidationConstants = {
    popupSubmitButton: '.popup__submit-button',
    popupSubmitButtonDisabled: 'popup__submit-button_disabled',

}


export { errorList, enableValidationConstants, formArr, popupArr, fullScreenCloseButton, popupFullScreen, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplate, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, popupNewPhotoCloseButton, profileAddCardButton, initialCards, formNewPhoto, closePopupProfileEdit }