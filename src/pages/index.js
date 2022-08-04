// //0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "./index.css";//0.3 импорт для вебпака 
import { Card } from "../components/Card.js";//0.1 импорт функций работы с карточками
import { Api } from "../components/Api.js"
import { Section } from "../components/Section.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
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
} from "../utils/constants.js"//РАЗОБРАТЬСЯ С КОНСТАНТАМИ
import { FormValidator } from '../components/FormValidator.js'



let userId;
let userProfileName;
let userProfileJob;
let userProfileAvatar;

const userInfo = new UserInfo({ profileUserName, profileUserJob, profileAvatar: userAvatar })//тут определяем все данные на странице. в том числе userId
const api = new Api(options)//api.СОЗДАЕТСЯ 1 РАЗ


api.getUserProfileInfo()

    .then(data => {
        const userData = userInfo.getUserInfo(data)
        userInfo.setUserInfo(userData)
        userId = userData._id;
        userProfileName = userData.name;
        userProfileJob = userData.about;
        userProfileAvatar = userData.avatar;
    })
    .catch(res => console.log(res))

//редактирование профиля ------------------------------------------------------------------------------------------------------------------------------------------------



const popupWithFormProfile = new PopupWithForm({
    selector: popupProfileEdit, handler: (data) => {

        // profileUserName.textContent = data[0]
        // profileUserJob.textContent = data[1]
        //  // profileNameInput.textContent = profileNameInput
        popupWithFormProfile.toggleSubmitButtonTextContent('Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
        api.pushProfileData(profileNameInput, profileJobInput)//5. Редактирование профиля
            .then(newData => {
                popupWithFormProfile.close()
                //   popup.saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
                return newData
            })
            .then(newData => userInfo.setUserInfo(newData))
            //.then(newData => userInfo.updateUserInfo())
            //  .then(newData => popup.closePopup())//закрываю попап
            .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
            .finally(res => popupWithFormProfile.toggleSubmitButtonTextContent('Сохранить'))//возвращаю текст контент кнопке
    }
})
popupWithFormProfile.setEventListeners()







const validPopupProfileEdit = new FormValidator(validatorConfig, popupSubmitProfileForm)//валидация попапа
validPopupProfileEdit.enableValidation()//валидация попапа

openPopupProfileEditButton.addEventListener('click', () => {//открытие попапа
    profileJobInput.value = profileUserJob.textContent
    profileNameInput.value = profileUserName.textContent
    validPopupProfileEdit.enableValidation()
    popupWithFormProfile.openPopup();//открытие попапа

    //popupWithFormProfile.showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)//открытие попапа
    //validPopupProfileEdit.resetError(popupSubmitProfileForm)//открытие попапа
})//слушатель событий кнопки открыть по-пап редактирования профиля

//редактирование профиля ------------------------------------------------------------------------------------------------------------------------------------------------




//дабвления карточки на страницу ------------------------------------------------------------------------------------------------------------------------------
//const popupNewCard = new Popup(popupAddNewPhoto)
//popupNewCard.setEventListeners(closeButtons)


const validPopupAddCard = new FormValidator(validatorConfig, formNewPhoto)
validPopupAddCard.enableValidation()



profileAddCardButton.addEventListener('click', () => {
    validPopupAddCard.enableValidation()
    formNewPhoto.reset()
    popupFormNewCard.openPopup()
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
        // userInfo.getUserInfo({ name, about, avatar })//аватар не работает
        // userInfo.updateUserInfo(profileUserName, profileUserJob, userAvatar)//аватар не работает


        cards.forEach(card => {
            const cardData = new Card({
                data: card, api, userId, templateSelector,
                handleCardClick: (elementImage) => {
                    elementImage.addEventListener('click', () => {
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


//const popupAva = new Popup(popupAvatar)
//popupAva.setEventListeners(closeButtons)
const validPopupUserAvatar = new FormValidator(validatorConfig, popupAvatarForm)
validPopupUserAvatar.enableValidation()

userAvatar.addEventListener('click', () => {
    validPopupUserAvatar.enableValidation()
    popupAvatarForm.reset()
    popupAvaForm.openPopup()
    // popupAva.clearInputsValue()
    //  validPopupUserAvatar.disableSubmitButton(avatarSubmit, validatorConfig.inactiveButtonClass)
    // validPopupUserAvatar.resetError(popupAvatar)
})



const popupAvaForm = new PopupWithForm({
    selector: popupAvatar,
    handler: () => {
        popupAvaForm.toggleSubmitButtonTextContent('Сохранение...')

        api.patchProfileAvatar(popupAvatarUrlInput.value)//добавил api.
            .then(res => {
                userAvatar.src = res.avatar
                popupAvaForm.close()
            })
            .catch(err => console.log(err))
            .finally(res => popupAvaForm.toggleSubmitButtonTextContent('Сохранить'))

    }
})

popupAvaForm.setEventListeners()

