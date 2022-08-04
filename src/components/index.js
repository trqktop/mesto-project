// //0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import { Card } from "./Card.js";//0.1 импорт функций работы с карточками
import { Api } from "./api.js"
import { Section } from "./Section.js"
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
import { Popup } from './Popup.js'//0.2 импорт Работа модальных окон
import { FormValidator } from './FormValidator.js'

let userId;
const api = new Api(options)//api.СОЗДАЕТСЯ 1 РАЗ


api.getUserId()
    .then(data => userId = data._id)



const userInfo = new UserInfo({ profileUserName, profileUserJob, profileAvatar: userAvatar })





//вызвать UserInfo вначале Index.js и определить все переменные. этот класс вызывается 1 раз!
//////Класс UserInfo теперь должен устанавливать все данные пользователя, включая аватар (и желательно еще и _id тоже)
//названия классов и файлов не соответствуют чек-листу и заданию.
//класс Popup нельзя использовать в index.js. Он только для наследования
//код классов не соответствует заданию: класс Popup не должен заниматься вставкой данных
//Все данные инпутов собирает метод _getInputValues из класса PopupWithForm и передает их в функцию сабмита submitHandler.






const popup = new Popup(popupProfileEdit)//открытие попапа
popup.setEventListeners(closeButtons)//закпрытие попапа


//редактирование профиля ------------------------------------------------------------------------------------------------------------------------------------------------



const popupWithFormProfile = new PopupWithForm({
    selector: popupProfileEdit, handler: () => {
        //this.profileJobInput = profileJobInput
        //this.profileNameInput = profileNameInput
        popupWithFormProfile.toggleSubmitButtonTextContent('Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
        api.pushProfileData(profileNameInput, profileJobInput)//5. Редактирование профиля
            .then(newData => {
                popupWithFormProfile.close()
                //   popup.saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
                return newData
            })
            .then(newData => userInfo.setUserInfo(newData))
            .then(newData => userInfo.updateUserInfo())
            //  .then(newData => popup.closePopup())//закрываю попап
            .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
            .finally(res => popupWithFormProfile.toggleSubmitButtonTextContent('Сохранить'))//возвращаю текст контент кнопке
    }
})
popupWithFormProfile.setEventListeners()







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
    // popupNewCard.clearInputsValue(popupAddNewPhoto)
    // validPopupAddCard.resetError(formNewPhoto)
    // validPopupAddCard.disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
})



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const popupFormNewCard = new PopupWithForm({
    selector: popupAddNewPhoto,
    handler: ([inputName, inputSrc]) => {
        popupFormNewCard.toggleSubmitButtonTextContent('Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
        api.pushNewCard(inputName, inputSrc)//пушим карточку на сервер
            .then(cardFromServer => {


                //создаем карточку
                const cardData = new Card({
                    data: cardFromServer, api, userId, templateSelector,
                    handleCardClick: (elementImage) => {
                        elementImage.addEventListener('click', () => {
                            popupWithImage.open(cardFromServer)
                        })
                    }
                })
                const cardElement = cardData.generate()



                //вставляем карточку в разметку
                const section = new Section({
                    cards: cardFromServer,
                    renderer: () => {
                        section.addItem(cardElement)
                    }
                }, elementsGridContainer)
                section.addItem(cardElement)



            })
            .then(newCard => {
                popupFormNewCard.close()



            })
            .catch(err => console.log(err))//выводим в консоль ошибку в случае возвращения с сервера ошибки
            .finally(res => {
                popupFormNewCard.toggleSubmitButtonTextContent('Сохранить')
            })//возвращаем текст контент кнопки сохранить
    }
})
popupFormNewCard.setEventListeners()


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const popupWithImage = new PopupWithImage(popupFullScreen)


//инициализация карточек при первом запуске ----------------------------------------------------------------------------------------------------------------
Promise.all([api.getUserId(), api.getInitialCards()])//переписать getUserId() на UserInfo class
    .then(([userData, cards]) => {
        const { name, about, avatar, _id: userId, cohort } = userData
        // userAvatar.src = avatar
        //profileUserName.textContent = name
        //profileUserJob.textContent = about
        userInfo.getUserInfo({ name, about, avatar })//аватар не работает
        userInfo.updateUserInfo(profileUserName, profileUserJob, userAvatar)//аватар не работает


        cards.forEach(card => {
            const cardData = new Card({
                data: card, api, userId, templateSelector,
                handleCardClick: (elementImage) => {
                    elementImage.addEventListener('click', () => {
                        console.log(card)
                        popupWithImage.open(card)
                    })
                }
            })
            const cardElement = cardData.generate()




            const section = new Section({
                card,
                renderer: () => {
                    section.addItem(cardElement)
                }
            }, elementsGridContainer)
            section.renderer()
        })



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



const popupAvaForm = new PopupWithForm({
    selector: popupAvatar, handler: () => {
        //  submitButton.textContent = 'Сохранение...'
        api.patchProfileAvatar(popupAvatarUrlInput.value)//добавил api.
            .then(res => {
                userAvatar.src = res.avatar
                popupAvaForm.close()
            })
            .catch(err => console.log(err))
        //   .finally(res => submitButton.textContent = 'Сохранить')

    }
})



popupAvaForm.setEventListeners()
