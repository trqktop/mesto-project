//0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import { insertCard, createCards } from "./card.js";//0.1 импорт функций работы с карточками
import { checkCardOwn, userId, checkCards, initLikes, setLikesCount, pushNewCard, pushProfileData, getUserProfileInfo, getInitialCards } from "./api.js"
//0.2 импорт переменных

import { popupFullScreen, fullScreenCloseButton, popupArr, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplate, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, popupNewPhotoCloseButton, profileAddCardButton, initialCards, formNewPhoto, closePopupProfileEdit } from "./constants.js"
import { clearInputsValue, showInputValueAfterOpenPopup, openPopup, closePopup, saveChange, submitListener } from './modal.js'//0.2 импорт Работа модальных окон




import { enableValidation, resetError } from './validate.js'


enableValidation(validatorConfig)





//1. Работа модальных окон
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
closePopupProfileEdit.addEventListener('click', () => {
    closePopup(popupProfileEdit)
    resetError(popupProfileEdit, validatorConfig)
})//слушатель событий кнопки закрыть по-пап редактирования профиля

//слушатель событий кнопки открыть по-пап редактирования профиля
openPopupProfileEditButton.addEventListener('click', () => {
    openPopup(popupProfileEdit);
    showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
})

popupSubmitProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    submitListener(popupProfileEdit);
    saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
    pushProfileData(profileUserName, profileUserJob)//5. Редактирование профиля
})//слушатель событий сохранить изменения в профиль


//2. Шесть карточек «из коробки»
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//initialCards.forEach(item => insertCard(elementsGridContainer, createCards(item.link, item.name, userTemplateLi)))
//перебираем массив и вызываем функцию к каждому элементу массива 


//3. Форма добавления карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
popupNewPhotoCloseButton.addEventListener('click', () => {
    closePopup(popupAddNewPhoto);
    clearInputsValue(popupAddNewPhoto);
    resetError(popupAddNewPhoto, validatorConfig)
})


profileAddCardButton.addEventListener('click', () => openPopup(popupAddNewPhoto))






//4. Добавление карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()
    insertCard(elementsGridContainer, createCards(urlImageInput.value, nameImageInput.value, userTemplateLi))
    pushNewCard(nameImageInput.value, urlImageInput.value)
    closePopup(popupAddNewPhoto)
    clearInputsValue(popupAddNewPhoto);
    resetError(popupAddNewPhoto, validatorConfig)
})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 
//5. Лайк карточки - в модуле card.js
//6. Удаление карточки - в модуле card.js
//7. Открытие попапа с картинкой - в модуле card.js


fullScreenCloseButton.addEventListener('click', () => closePopup(popupFullScreen))//закрытие попапа фуллскрин 

//3. Загрузка информации о пользователе с сервера
getUserProfileInfo()
    .then(res => {
        profileUserName.textContent = res.name
        profileUserJob.textContent = res.about
    })
    .catch(err => console.log(err))




//4. Загрузка карточек с сервера





getInitialCards()
    .then(data => {
        data.forEach(item => {
            insertCard(elementsGridContainer, createCards(item.link, item.name, userTemplateLi, item))
        })
    })
    .catch(err => console.log(err))



//7. Отображение количества лайков карточки

/*const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}


-------------------------------------------------------------------------------------------------------------------------------------------------
import { getInitialCards } from './api.js'

getInitialCards()
    .then((result) => {
        // обрабатываем результат
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });


*/

//8. Удаление карточки





setLikesCount()
    .then(serverItems => {
        initLikes(serverItems)
    })




//8. Удаление карточки


userId()
    .then(userid => {
        checkCards()
            .then(res => res.reverse())
            .then(res => checkCardOwn(res, userid))
    })




