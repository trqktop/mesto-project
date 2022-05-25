let popupEditProfile = document.querySelector('.popup');//попак редактировать профиль
let closeEditProfile = popupEditProfile.querySelector('.popup__close-button');//кнопка -закрыть попап редактирования профиля
let openEditProfile = document.querySelector('.profile__edit-button');//кнопка -открыть попап редактирования профиля



openEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для открытия попапа
closeEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для закрытия попапа

function openClose() {
    popupEditProfile.classList.toggle('popup_opened');
} //обработчик открытия и закрытия попап






let porfileName = document.querySelector('.profile__user-name');//имя пользователя на главной

let porfileAbout = document.querySelector('.profile__user-about');//профессия пользователя на главной


let popupInputName = document.querySelector('#popupNameInput ');//ввод имя пользователя 
let popupInputAbout = document.querySelector('#popupAboutInput');//ввод профессии пользователя

let popupSubmit = document.querySelector('.popup__submit-button')//кнопка сохранить изменения в попапе редактирования профиля




popupSubmit.addEventListener('click', saveClose);//отслеживаем клик и даем ссылку на обработчик для сохранения инфы в попапе


popupInputName.value = porfileName.textContent;
popupInputAbout.value = porfileAbout.textContent;

function saveClose(evt) {
    evt.preventDefault();
    porfileName.textContent = popupInputName.value;
    porfileAbout.textContent = popupInputAbout.value;
    openClose()
}//обработчик кнопки сохранить в попап редактор профиля


//нИЖЕ ПОПАП ДОБАВЛЕНИЯ НОВОГО МЕСТА НА СТРАНИЦЕ ПО АЙДИШНИКАМ

let popupMesto = document.querySelector('#popupMesto')//попап редактирования места

let profileAddButton = document.querySelector('.profile__add-button')//кнопка открытия попапа редактирования места 

let createMesto = document.querySelector('#createMesto')//кнопка сохранения места 

let mestoCloseButton = document.querySelector('#mestoCloseButton');

mestoCloseButton.addEventListener('click',addMestoOpen)//СОБЫТИЕ ЗАКРЫТИЯ ПОПАПА МЕСТО
createMesto.addEventListener('click',addMestoOpen)//событие кнопки сохранить

profileAddButton.addEventListener('click',addMestoOpen)//событие кнопки открыть попап редактирования места


function addMestoOpen(){
    popupMesto.classList.toggle('popup_opened');
}//ОБРАБОТЧИК ЗАКРЫТТИЯ ПОПАПА
