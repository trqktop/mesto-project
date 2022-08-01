// //0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import { Card } from "./card.js";//0.1 импорт функций работы с карточками
import { Api } from "./api.js"
import { Section } from "./section.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './userInfo.js'
// //0.2 импорт переменных
import {
    templateSelector,
    userTemplate,
    popupFullScreen, fullScreenCloseButton, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto,
    userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName,
    popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, profileAddCardButton, formNewPhoto, avatarEditPen,
    userAvatar, popupAvatar, popupAvatarForm, popupAvatarUrlInput, addNewPhotoSubmitButton, submitButtonEditProfile,
    closeButtons, options, fullScreenImage, fullScreenImageDescription
} from "./constants.js"
import { Popup } from './modal.js'//0.2 импорт Работа модальных окон
import { FormValidator } from './validate.js'
import { CardNew } from './newCard.js'
let userId;

const api = new Api(options)//вызвал конструктор . передал конфиг и записал в константу
api.getUserId()
    .then(data => userId = data._id)




//enableValidation(validatorConfig);//включил валидацию


//PopupWithImage._listenerFullScreenImage() {// В ПОПАПАХ 
//    card.elementImage.addEventListener('click', () => {
//
//    })
//}



const popupWithFormProfile = new PopupWithForm(popupSubmitProfileForm, () => {
    popupSubmitProfileForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        popup.toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
        api.pushProfileData(profileNameInput, profileJobInput)//5. Редактирование профиля
            .then(res => {

                popup.saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
                return res
            })
            .then(newData => userInfo.setUserInfo(newData))
            .then(res => userInfo.updateUserInfo())
            .then(res => popup.closePopup(popupProfileEdit))//закрываю попап
            .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
            .finally(res => popup.toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранить'))//возвращаю текст контент кнопке
    })//слушатель событий сохранить изменения в профиль
})

popupWithFormProfile.listener()





const popup = new Popup(popupProfileEdit)
popup.setEventListeners(closeButtons)
const validPopupProfileEdit = new FormValidator(validatorConfig, popupSubmitProfileForm)
validPopupProfileEdit.enableValidation()

openPopupProfileEditButton.addEventListener('click', () => {
    popup.openPopup();
    popup.showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
    validPopupProfileEdit.resetError(popupSubmitProfileForm)
})//слушатель событий кнопки открыть по-пап редактирования профиля



const popupNewCard = new Popup(popupAddNewPhoto)
popupNewCard.setEventListeners(closeButtons)
const validPopupAddCard = new FormValidator(validatorConfig, formNewPhoto)
validPopupAddCard.enableValidation()

profileAddCardButton.addEventListener('click', () => {
    popupNewCard.openPopup()
    validPopupAddCard.enableValidation()
    popupNewCard.clearInputsValue(popupAddNewPhoto)
    validPopupAddCard.resetError(formNewPhoto)
})

const popupAva = new Popup(popupAvatar)
popupAva.setEventListeners(closeButtons)
const validPopupUserAvatar = new FormValidator(validatorConfig, popupAvatarForm)
validPopupUserAvatar.enableValidation()

userAvatar.addEventListener('click', () => {
    popupAva.openPopup()
    popupAva.clearInputsValue(popupAvatar)
    validPopupUserAvatar.disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
    validPopupUserAvatar.resetError(popupAvatar, validatorConfig)
})


// //4. Добавление карточки
// //слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const popupFormNewPhoto = new PopupWithForm(formNewPhoto, () => {
    formNewPhoto.addEventListener('submit', (evt) => {
        evt.preventDefault()//отменяем дефолтный субмит
        popupFormNewPhoto.toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
        api.pushNewCard(nameImageInput.value, urlImageInput.value)//пушим карточку на сервер
            .then(cardFromServer => {
                const newCard = new CardNew(cardFromServer, userId, templateSelector)
                console.log(cardFromServer)
                const section = new Section({
                    cards: cardFromServer,
                    renderer: (cardFromServer) => {
                        const cardElement = new Card(cardFromServer.link, cardFromServer.name, userTemplateLi, cardFromServer, userId).createCards()
                        const elementImage = cardElement.querySelector('.element__image')
                        section.addItem(cardElement)
                        elementImage.addEventListener('click', () => {//создал слушатель клика по карточке PopupWithImage
                            popupWithImage.open(cardFromServer)//создал слушатель клика по карточке PopupWithImage
                        })//создал слушатель клика по карточке PopupWithImage
                    }
                }, elementsGridContainer)
                section.rendererOneElement()
            })
            .then(newCard => {
                popupNewCard.closePopup()
            })//закрываем попап
            .catch(err => console.log(err))//выводим в консоль ошибку в случае возвращения с сервера ошибки
            .finally(res => popupFormNewPhoto.toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранить'))//возвращаем текст контент кнопки сохранить
    })//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов

})

popupFormNewPhoto.listener()
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



// //const elements = document.forms.myForm.elements;



// //3. Загрузка информации о пользователе с сервера



// const initCard = new Card()
// constructor(srcValue, titleValue, userTemplateLi, cardFromServer, userId)
// // //getInitialCards()

const popupWithImage = new PopupWithImage(popupFullScreen)
const userInfo = new UserInfo(profileUserName, profileUserJob)


Promise.all([api.getUserId(), api.getInitialCards()])//добавил api.
    .then(([userData, cards]) => {
        const { name, about, avatar, _id: userId, cohort } = userData//деконструировал объект  userData в константы
        userAvatar.src = avatar
        //profileUserName.textContent = name
        //profileUserJob.textContent = about
        userInfo.getUserInfo({ name, about })
        userInfo.updateUserInfo(profileUserName, profileUserJob)
        //    cards.reverse().forEach((card, index) => {
        //        const cardElement = new Card(card.link, card.name, userTemplateLi, card, userId, elementsGridContainer)
        //        cardElement.createCards()
        //    })
        const section = new Section({
            cards,
            renderer: (card) => {
                const cardElement = new Card(card.link, card.name, userTemplateLi, card, userId).createCards()
                const elementImage = cardElement.querySelector('.element__image')
                section.addItem(cardElement)
                elementImage.addEventListener('click', () => {//создал слушатель клика по карточке PopupWithImage
                    popupWithImage.open(card)//создал слушатель клика по карточке PopupWithImage
                })//создал слушатель клика по карточке PopupWithImage
            }
        }, elementsGridContainer)
        section.renderer()

    })
    .catch(err => {
        console.log(err)
    })


userAvatar.addEventListener('mouseover', () => {
    showPen()
})

userAvatar.addEventListener('mouseout', () => {
    hidePen()
})

export const showPen = () => {
    avatarEditPen.style.display = "block"
}

export const hidePen = () => {
    avatarEditPen.style.display = "none"
}


popupAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const submitButton = evt.submitter
    submitButton.textContent = 'Сохранение...'
    api.patchProfileAvatar(popupAvatarUrlInput.value)//добавил api.
        .then(res => {
            userAvatar.src = res.avatar
            closePopup(popupAvatar)
        })
        .catch(err => console.log(err))
        .finally(res => submitButton.textContent = 'Сохранить')
})

