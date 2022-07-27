export const closeButtons = document.querySelectorAll('.popup__close-button');
export const openPopupProfileEditButton = document.querySelector('.profile__edit-button')



const popupSubmitProfileForm = document.querySelector('.popup__edit-form')
const popupProfileEdit = document.querySelector('#popupEditProfile')//по-пап редактировать профиль 
export const submitButtonEditProfile = popupProfileEdit.querySelector('.popup__submit-button')


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

export const popupAvatarUrlInput = document.querySelector('#urlNewAvatar')
export const userAvatar = document.querySelector('.profile__avatar')
const userTemplate = document.querySelector('.template').content;//ищем на страницу template с его контентом
const userTemplateLi = userTemplate.querySelector('li');//берем контейнер для копирования 

const inputArr = Array.from(popupAddNewPhoto.querySelectorAll('input'))
export const avatarEditPen = document.querySelector('.profile__avatar_edit')

const fullScreenImage = popupFullScreen.querySelector('.popup__fullscreen-image')//ссылка на фулскрин картинку
const fullScreenImageDescription = popupFullScreen.querySelector('.popup__caption')//заголовок картинки

const addNewPhotoSubmitButton = popupAddNewPhoto.querySelector('.popup__submit-button')
export const popupAvatar = document.querySelector('#popupAvatar')
export const popupAvatarCloseButton = popupAvatar.querySelector('.popup__close-button')
export const popupAvatarForm = popupAvatar.querySelector('form')








const validatorConfig = ({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: '.popup__input_error-style',
    errorClass: '.popup__input-error',
    openedPopup: 'popup_opened'
})




const options = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    }
}//перенести в константы





export {options, addNewPhotoSubmitButton, inputArr, validatorConfig, fullScreenImage, fullScreenImageDescription, errorList, formArr, popupArr, fullScreenCloseButton, popupFullScreen, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplate, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, popupNewPhotoCloseButton, profileAddCardButton, initialCards, formNewPhoto, closePopupProfileEdit }