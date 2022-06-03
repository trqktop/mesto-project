//1. Работа модальных окон
//переменные -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
let popupProfileEdit = document.querySelector('.popup')//по-пап редактировать профиль 
const profile = document.querySelector('.profile')//секция профиль
let openPopupProfileEdit = profile.querySelector('.profile__edit-button')//кнопка редактирование
let closePopupProfileEdit = popupProfileEdit.querySelector('.popup__close-button')//кнопка закрытия 


let profileUserName = profile.querySelector('.profile__user-name');//профиль имя
let profileUserJob = profile.querySelector('.profile__user-about');//профиль профессия


let profileNameInput = popupProfileEdit.querySelector('#profileNameInput');//input профиль имя
let profileJobInput = popupProfileEdit.querySelector('#profileJobInput')//input профиль профессия
let popupSubmitProfile = document.querySelector('#popupSubmitProfile')//кнопка сохранить изменения в по-папе

profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

closePopupProfileEdit.addEventListener('click', function () {
    openClose(popupProfileEdit)
})//слушатель событий кнопки закрыть по-пап редактирования профиля


openPopupProfileEdit.addEventListener('click', function () {
    openClose(popupProfileEdit)
})//слушатель событий кнопки открыть по-пап редактирования профиля


popupSubmitProfile.addEventListener('click', function (evt) {
    evt.preventDefault()
    saveChange()
})//слушатель событий сохранить изменения в профиль


//функции-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function saveChange() {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}//функция грузит из input в профиль значения


function openClose(popupElement) {
    popupElement.classList.toggle('popup_opened')
}//функция открытия и закрытия по-папа




//2. Шесть карточек «из коробки»
//переменные---------------------------------------------------------------------------------------------------------------------------------------

let elementsGridContainer = document.querySelector('.elements__grid-container')//контейнер для вставки ли блока
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

//функции---------------------------------------------------------------------------------------------------------------------------------------

initialCards.forEach(function (item) {
    addCardsOnPage(item.link, item.name)

})//перебираем массив и вызываем функцию к каждому элементу массива 

function addCardsOnPage(srcValue, titleValue) {
    let userTemplate = document.querySelector('.template').content;//ищем на страницу template с его контентом
    let userTemplateLi = userTemplate.querySelector('li');//берем контейнер для копирования 
    let cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    cardElement.querySelector('.element__image').setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    cardElement.querySelector('.element__image').setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
    elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 
}


//3. Форма добавления карточки
//переменные------------------------------------------------------------------------------------------------------------------------------------
let profileAddCardButton = profile.querySelector('.profile__add-button')
let popupMesto = document.querySelector('#popupMesto')
let mestoCloseButton = popupMesto.querySelector('#mestoCloseButton')



//функции-----------------------------------------------------------------------------------------------------------------------------------

mestoCloseButton.addEventListener('click', function () {
    openClose(popupMesto)
})
profileAddCardButton.addEventListener('click', function () {
    openClose(popupMesto)
})
//4. Добавление карточки
//переменные----------------------------------------------------------------------------------------------------------------------------------
let nameImageInput = document.querySelector('#nameImageInput')//поля ввода - имя картинки
let urlImageInput = document.querySelector('#urlImageInput')//поля ввода - ссылка на картинку
let popupMestoSubmit = document.querySelector('#createMesto') //кнопка - сохранить
//функции-----------------------------------------------------------------------------------------------------------------------------------
popupMestoSubmit.addEventListener('click', function (evt) {
    evt.preventDefault()
    addCardsOnPage(urlImageInput.value, nameImageInput.value)
    openClose(popupMesto)

})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 

//5. Лайк карточки
//переменные---------------------------------------------------------------------------------------------------------------------------------------
let like = document.querySelectorAll('.element__button')//наше все лайки на странице
let likeArr = Array.from(like)//перевел лайки в массив
//функции-----------------------------------------------------------------------------------------------------------------------------------
likeArr.forEach(function (item) {
    item.addEventListener('click', function () {
        item.classList.toggle('element__button_active')
    })
})

