
//1. Работа модальных окон
//переменные -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupProfileEdit = document.querySelector('.popup')//по-пап редактировать профиль 
const profile = document.querySelector('.profile')//секция профиль
const openPopupProfileEdit = profile.querySelector('.profile__edit-button')//кнопка редактирование
const closePopupProfileEdit = popupProfileEdit.querySelector('.popup__close-button')//кнопка закрытия 


const profileUserName = profile.querySelector('.profile__user-name');//профиль имя
const profileUserJob = profile.querySelector('.profile__user-about');//профиль профессия



const profileNameInput = popupProfileEdit.querySelector('#profileNameInput');//input профиль имя
const profileJobInput = popupProfileEdit.querySelector('#profileJobInput')//input профиль профессия



const popupFormSubmitProfile = document.querySelector('.popup__edit-form')



//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

closePopupProfileEdit.addEventListener('click', () => openClosePopup(popupProfileEdit))//слушатель событий кнопки закрыть по-пап редактирования профиля
openPopupProfileEdit.addEventListener('click', () => {
    openClosePopup(popupProfileEdit);
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.

})//слушатель событий кнопки открыть по-пап редактирования профиля

popupFormSubmitProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveChange();
    openClosePopup(popupProfileEdit);
})//слушатель событий сохранить изменения в профиль


//функции-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function saveChange() {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}//функция грузит из input в профиль значения


function openClosePopup(popupElement) {
    popupElement.classList.toggle('popup_opened')
}//функция открытия и закрытия по-папа




//2. Шесть карточек «из коробки»
//переменные---------------------------------------------------------------------------------------------------------------------------------------


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

initialCards.forEach(item => addCardsOnPage(item.link, item.name))//перебираем массив и вызываем функцию к каждому элементу массива 




function addCardsOnPage(srcValue, titleValue) {
    const userTemplate = document.querySelector('.template').content;//ищем на страницу template с его контентом
    const userTemplateLi = userTemplate.querySelector('li');//берем контейнер для копирования 
    const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    elementImage.setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
    insertCard(cardElement)

    //фуллскрин картинки
    elementImage.addEventListener('click', function () {
        popupFullScreen.querySelector('.popup__fullscreen-image').src = elementImage.src;
        popupFullScreen.querySelector('.popup__caption').textContent = cardElement.querySelector('.element__caption-about').textContent;
        popupFullScreen.querySelector('.popup__fullscreen-image').alt = elementImage.alt
        openClosePopup(popupFullScreen)
    })

    //кнопка удалить
    cardElement.querySelector('.element__delete-button').addEventListener('click', () =>
        cardDelete(cardElement))
    //кнопка лайк 
    cardElement.querySelector('.element__button').addEventListener('click', () =>
        likeActive(cardElement.querySelector('.element__button'))
    )

}

function insertCard(cardElement) {
    const elementsGridContainer = document.querySelector('.elements__grid-container')//контейнер для вставки ли блока
    elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 
    return
}//функция вставить карточку 


//3. Форма добавления карточки
//переменные------------------------------------------------------------------------------------------------------------------------------------
const profileAddCardButton = profile.querySelector('.profile__add-button')
const popupAddNewPhoto = document.querySelector('#popupMesto')
const popupNewPhotoCloseButton = popupAddNewPhoto.querySelector('#mestoCloseButton')



//функции-----------------------------------------------------------------------------------------------------------------------------------

popupNewPhotoCloseButton.addEventListener('click', () => openClosePopup(popupAddNewPhoto))


profileAddCardButton.addEventListener('click', () => openClosePopup(popupAddNewPhoto))


//4. Добавление карточки
//переменные----------------------------------------------------------------------------------------------------------------------------------
const nameImageInput = document.querySelector('#nameImageInput')//поля ввода - имя картинки
const urlImageInput = document.querySelector('#urlImageInput')//поля ввода - ссылка на картинку



let formNewPhoto = document.querySelector('#formNewPhoto')

//функции-----------------------------------------------------------------------------------------------------------------------------------
formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()
    addCardsOnPage(urlImageInput.value, nameImageInput.value)
    openClosePopup(popupAddNewPhoto)

})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 

//5. Лайк карточки
//переменные---------------------------------------------------------------------------------------------------------------------------------------
//функции
function likeActive(item) {
    item.classList.toggle('element__button_active')
}

//6. Удаление карточки
//переменные---------------------------------------------------------------------------------------------------------------------------------------
function cardDelete(element) {
    element.remove()
}

//7. Открытие попапа с картинкой
//переменные---------------------------------------------------------------------------------------------------------------------------------------

const popupFullScreen = document.querySelector('.popup__fullscreen')
const fullScreenCloseButton = popupFullScreen.querySelector('.popup__close-button')


//функции

fullScreenCloseButton.addEventListener('click', () => openClosePopup(popupFullScreen))
