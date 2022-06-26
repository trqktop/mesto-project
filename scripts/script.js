
//1. Работа модальных окон
//переменные -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupProfileEdit = document.querySelector('#popupEditProfile')//по-пап редактировать профиль 
const profile = document.querySelector('.profile')//секция профиль
const openPopupProfileEdit = profile.querySelector('.profile__edit-button')//кнопка редактирование
const closePopupProfileEdit = popupProfileEdit.querySelector('.popup__close-button')//кнопка закрытия 


const profileUserName = profile.querySelector('.profile__user-name');//профиль имя
const profileUserJob = profile.querySelector('.profile__user-about');//профиль профессия



const profileNameInput = popupProfileEdit.querySelector('#profileNameInput');//input профиль имя
const profileJobInput = popupProfileEdit.querySelector('#profileJobInput')//input профиль профессия



const popupFormSubmitProfile = document.querySelector('.popup__edit-form')



//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

closePopupProfileEdit.addEventListener('click', () => {
    closePopup(popupProfileEdit)
})//слушатель событий кнопки закрыть по-пап редактирования профиля
openPopupProfileEdit.addEventListener('click', () => {
    openPopup(popupProfileEdit);
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.

})//слушатель событий кнопки открыть по-пап редактирования профиля

popupFormSubmitProfile.addEventListener('submit', submitListener) //слушатель событий сохранить изменения в профиль

function submitListener(evt) {
    evt.preventDefault();
    saveChange();
    closePopup(popupProfileEdit);
}
//функции-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function saveChange() {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}//функция грузит из input в профиль значения


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
    clickOverlayClosePopupListener(popupElement)
    enableValidation()
    keyClosePopupListener(popupElement)
}//функция открытия и закрытия по-папа

function closePopup(popupElement) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    popupElement.classList.remove('popup_opened')
    closeHideErrorMessage(popupElement)
}

function closeHideErrorMessage(popupElement) {
    Array.from(popupElement.querySelectorAll('span')).forEach((item) =>
        item.textContent = '')
    showSubmitButton(popupElement.querySelector('form'))
}

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

initialCards.forEach(item => {
    insertCard(createCards(item.link, item.name))
}
)//перебираем массив и вызываем функцию к каждому элементу массива 




function createCards(srcValue, titleValue) {
    const userTemplate = document.querySelector('.template').content;//ищем на страницу template с его контентом
    const userTemplateLi = userTemplate.querySelector('li');//берем контейнер для копирования 
    const cardElement = userTemplateLi.cloneNode(true);//копируем контейнер выше в объявленную переменную
    const elementImage = cardElement.querySelector('.element__image')
    elementImage.setAttribute('src', srcValue) //установил аттрибут ссылки на картинку и задал источник
    elementImage.setAttribute('alt', titleValue)
    cardElement.querySelector('.element__caption-about').textContent = titleValue;// установил текст контент из источника
    listenerFullScreenImage(elementImage, cardElement)
    deleteCardButtonListener(cardElement)
    likeButtonListener(cardElement)
    return cardElement
}





function insertCard(cardElement) {
    const elementsGridContainer = document.querySelector('.elements__grid-container')//контейнер для вставки ли блока
    elementsGridContainer.prepend(cardElement);//вставил копированную карточку в контейнер 

}//функция вставить карточку 


//слушатель событий

function listenerFullScreenImage(elementImage, cardElement) {
    //фуллскрин картинки
    elementImage.addEventListener('click', function () {
        popupFullScreen.querySelector('.popup__fullscreen-image').src = elementImage.src;
        popupFullScreen.querySelector('.popup__caption').textContent = cardElement.querySelector('.element__caption-about').textContent;
        popupFullScreen.querySelector('.popup__fullscreen-image').alt = elementImage.alt
        openPopup(popupFullScreen)

    })
}

function deleteCardButtonListener(cardElement) {
    cardElement.querySelector('.element__delete-button').addEventListener('click', () =>
        cardDelete(cardElement))
}//удаление карточки



function likeButtonListener(cardElement) {
    //кнопка лайк 
    cardElement.querySelector('.element__button').addEventListener('click', () =>
        likeActive(cardElement.querySelector('.element__button'))
    )

}






//3. Форма добавления карточки
//переменные------------------------------------------------------------------------------------------------------------------------------------
const profileAddCardButton = profile.querySelector('.profile__add-button')
const popupAddNewPhoto = document.querySelector('#popupMesto')
const popupNewPhotoCloseButton = popupAddNewPhoto.querySelector('#mestoCloseButton')



//функции-----------------------------------------------------------------------------------------------------------------------------------

popupNewPhotoCloseButton.addEventListener('click', () => closePopup(popupAddNewPhoto))


profileAddCardButton.addEventListener('click', () => openPopup(popupAddNewPhoto))


//4. Добавление карточки
//переменные----------------------------------------------------------------------------------------------------------------------------------
const nameImageInput = document.querySelector('#nameImageInput')//поля ввода - имя картинки
const urlImageInput = document.querySelector('#urlImageInput')//поля ввода - ссылка на картинку



let formNewPhoto = document.querySelector('#formNewPhoto')

//функции-----------------------------------------------------------------------------------------------------------------------------------
formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()
    insertCard(createCards(urlImageInput.value, nameImageInput.value))
    closePopup(popupAddNewPhoto)


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

fullScreenCloseButton.addEventListener('click', () => closePopup(popupFullScreen))



// валидация
//1. Валидация формы «Редактировать профиль»




function enableValidation() {
    const formList = Array.from(document.querySelectorAll('form'))
    listenerForms(formList)

}





function listenerForms(formList) {
    formList.forEach((form) =>
        form.addEventListener('input', (evt) => {
            checkInputValidity(evt.target, evt.currentTarget, evt.currentTarget.checkValidity())
            keyClosePopupListener(evt.currentTarget)
        }))
}


function checkInputValidity(currentInput, currentForm, formValidity) {
    if (!formValidity) {
        showInputError(currentInput)
        hideSubmitButton(currentForm)
    } else {
        hideInputError(currentInput)
        showSubmitButton(currentForm)
    }
}


function showInputError(currentInput) {
    document.querySelector(`.${currentInput.id}-error`).textContent = currentInput.validationMessage

}

function hideInputError(currentInput) {
    document.querySelector(`.${currentInput.id}-error`).textContent = ''
}

function showSubmitButton(currentForm) {
    currentForm.querySelector('button').classList.remove('popup__submit-button_disabled')
    currentForm.querySelector('button').disabled = false
}

function hideSubmitButton(currentForm) {
    currentForm.querySelector('button').classList.add('popup__submit-button_disabled')
    currentForm.querySelector('button').disabled = true
}




//3. Закрытие попапа кликом на оверлей
function clickOverlayClosePopupListener(popupElement) {
    document.addEventListener('click', (evt) => {
        if(popupElement === evt.target){
            closePopup(popupElement)
        }
        
    })
}



//4. Закрытие попапа нажатием на Esc

function keyClosePopupListener(formList) {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            formList.classList.remove('popup_opened')
        }
    })
}