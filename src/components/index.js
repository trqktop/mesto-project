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
    avatarSubmit,
    formEditAvatar,
    templateSelector,
    userTemplate,
    popupFullScreen, fullScreenCloseButton, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto,
    userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName,
    popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, profileAddCardButton, formNewPhoto, avatarEditPen,
    userAvatar, popupAvatar, popupAvatarForm, popupAvatarUrlInput, addNewPhotoSubmitButton, submitButtonEditProfile,
    closeButtons, options, fullScreenImage, fullScreenImageDescription
} from "./constants.js"//РАЗОБРАТЬСЯ С КОНСТАНТАМИ
import { Popup } from './modal.js'//0.2 импорт Работа модальных окон
import { FormValidator } from './FormValidator.js'

let userId;
//вызвать UserInfo вначале Index.js и определить все переменные. этот класс вызывается 1 раз!
//////Класс UserInfo теперь должен устанавливать все данные пользователя, включая аватар (и желательно еще и _id тоже)
//названия классов и файлов не соответствуют чек-листу и заданию.
//класс Popup нельзя использовать в index.js. Он только для наследования
//код классов не соответствует заданию: класс Popup не должен заниматься вставкой данных
//Все данные инпутов собирает метод _getInputValues из класса PopupWithForm и передает их в функцию сабмита submitHandler.



const api = new Api(options)//api.СОЗДАЕТСЯ 1 РАЗ
api.getUserId()
    .then(data => userId = data._id)




const popup = new Popup(popupProfileEdit)//открытие попапа
popup.setEventListeners(closeButtons)//закпрытие попапа


//редактирование профиля ------------------------------------------------------------------------------------------------------------------------------------------------



const popupWithFormProfile = new PopupWithForm(popupSubmitProfileForm, () => {
    popupSubmitProfileForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        //this.profileJobInput = profileJobInput
        //this.profileNameInput = profileNameInput
        popup.toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
        api.pushProfileData(profileNameInput, profileJobInput)//5. Редактирование профиля
            .then(newData => {

                //   popup.saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
                return newData
            })
            .then(newData => userInfo.setUserInfo(newData))
            .then(newData => userInfo.updateUserInfo())
            //  .then(newData => popup.closePopup())//закрываю попап
            .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
            .finally(res => popup.toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранить'))//возвращаю текст контент кнопке
    })//слушатель событий сохранить изменения в профиль

})
popupWithFormProfile.setEventListeners({ profileUserJob, profileUserName })

console.log(popupWithFormProfile)





const validPopupProfileEdit = new FormValidator(validatorConfig, popupSubmitProfileForm)//валидация попапа
validPopupProfileEdit.enableValidation()//валидация попапа

openPopupProfileEditButton.addEventListener('click', () => {//открытие попапа
    popup.openPopup();//открытие попапа
    popup.showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)//открытие попапа
    validPopupProfileEdit.resetError(popupSubmitProfileForm)//открытие попапа
})//слушатель событий кнопки открыть по-пап редактирования профиля

//редактирование профиля ------------------------------------------------------------------------------------------------------------------------------------------------




//дабвления карточки на страницу ------------------------------------------------------------------------------------------------------------------------------
const popupNewCard = new Popup(popupAddNewPhoto)
popupNewCard.setEventListeners(closeButtons)
const validPopupAddCard = new FormValidator(validatorConfig, formNewPhoto)
validPopupAddCard.enableValidation()




profileAddCardButton.addEventListener('click', () => {
    popupNewCard.openPopup()
    validPopupAddCard.enableValidation()
    popupNewCard.clearInputsValue(popupAddNewPhoto)
    validPopupAddCard.resetError(formNewPhoto)
    validPopupAddCard.disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
})



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const popupFormNewPhoto = new PopupWithForm(formNewPhoto, () => {
    formNewPhoto.addEventListener('submit', (evt) => {
        evt.preventDefault()//отменяем дефолтный субмит
        popupFormNewPhoto.toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
        api.pushNewCard(nameImageInput.value, urlImageInput.value)//пушим карточку на сервер
            .then(cardFromServer => {

                const section = new Section({
                    cards: cardFromServer,
                    renderer: (cardFromServer) => {
                        const cardElement = new Card({
                            data: cardFromServer, api, userId, templateSelector,
                            handleCardClick: (elementImage) => {
                                elementImage.addEventListener('click', () => {
                                    popupWithImage.open(cardFromServer)
                                })
                            }
                        }).generate()
                        section.addItem(cardElement)
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

popupFormNewPhoto.setEventListeners()
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const popupWithImage = new PopupWithImage(popupFullScreen)
const userInfo = new UserInfo(profileUserName, profileUserJob)

//инициализация карточек при первом запуске ----------------------------------------------------------------------------------------------------------------
Promise.all([api.getUserId(), api.getInitialCards()])//переписать getUserId() на UserInfo class
    .then(([userData, cards]) => {
        const { name, about, avatar, _id: userId, cohort } = userData
        userAvatar.src = avatar
        //profileUserName.textContent = name
        //profileUserJob.textContent = about
        userInfo.getUserInfo({ name, about, avatar })
        userInfo.updateUserInfo(profileUserName, profileUserJob, avatar)
        const section = new Section({
            cards,
            renderer: (card) => {
                const cardElement = new Card({
                    data: card, api, userId, templateSelector, handleCardClick: (elementImage) => {
                        elementImage.addEventListener('click', () => {
                            popupWithImage.open(card)
                        })
                    }
                }).generate()
                //  const elementImage = cardElement.querySelector('.element__image')
                section.addItem(cardElement)

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



//редактирование аватара------------------------------------------------


const popupAva = new Popup(popupAvatar)
popupAva.setEventListeners(closeButtons)
const validPopupUserAvatar = new FormValidator(validatorConfig, popupAvatarForm)
validPopupUserAvatar.enableValidation()

userAvatar.addEventListener('click', () => {
    popupAva.openPopup()
    popupAva.clearInputsValue()
    validPopupUserAvatar.disableSubmitButton(avatarSubmit, validatorConfig.inactiveButtonClass)
    validPopupUserAvatar.resetError(popupAvatar)
})



const popupAvaForm = new PopupWithForm(formEditAvatar, () => {
    formEditAvatar.addEventListener('submit', (evt) => {
        evt.preventDefault()
        const submitButton = formEditAvatar.querySelector('#avatarSubmitButton')
        submitButton.textContent = 'Сохранение...'
        api.patchProfileAvatar(popupAvatarUrlInput.value)//добавил api.
            .then(res => {
                userAvatar.src = res.avatar
                popupAva.closePopup()
            })
            .catch(err => console.log(err))
            .finally(res => submitButton.textContent = 'Сохранить')
    })
})

popupAvaForm.setEventListeners()


