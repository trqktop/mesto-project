const popupEditProfile = document.querySelector('.popup');//попак редактировать профиль
const closeEditProfile = popupEditProfile.querySelector('.popup__close-button');//кнопка -закрыть попап редактирования профиля
const openEditProfile = document.querySelector('.profile__edit-button');//кнопка -открыть попап редактирования профиля



openEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для открытия попапа
closeEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для закрытия попапа

function openClose() {
    popupEditProfile.classList.toggle('popup_opened');
} //обработчик открытия и закрытия попап






const porfileName = document.querySelector('.profile__user-name');//имя пользователя на главной

const porfileAbout = document.querySelector('.profile__user-about');//профессия пользователя на главной


const popupInputName = document.querySelector('#popupNameInput ');//ввод имя пользователя 
const popupInputAbout = document.querySelector('#popupAboutInput');//ввод профессии пользователя

const popupSubmit = document.querySelector('.popup__submit-button')//кнопка сохранить изменения в попапе редактирования профиля


popupInputName.value = porfileName.textContent;
popupInputAbout.value = porfileAbout.textContent;


popupSubmit.addEventListener('click', saveClose);//отслеживаем клик и даем ссылку на обработчик для сохранения инфы в попапе



function saveClose(evt) {
    evt.preventDefault();
    porfileName.textContent = popupInputName.value;
    porfileAbout.textContent = popupInputAbout.value;
    openClose()
}//обработчик кнопки сохранить в попап редактор профиля


//нИЖЕ ПОПАП ДОБАВЛЕНИЯ НОВОГО МЕСТА НА СТРАНИЦЕ ПО АЙДИШНИКАМ

const popupMesto = document.querySelector('#popupMesto')//попап редактирования места

const profileAddButton = document.querySelector('.profile__add-button')//кнопка открытия попапа редактирования места 

const createMesto = document.querySelector('#createMesto')//кнопка сохранения места 

const mestoCloseButton = document.querySelector('#mestoCloseButton');

mestoCloseButton.addEventListener('click', addMestoOpen)//СОБЫТИЕ ЗАКРЫТИЯ ПОПАПА МЕСТО
createMesto.addEventListener('click', addMestoOpen)//событие кнопки сохранить

profileAddButton.addEventListener('click', addMestoOpen)//событие кнопки открыть попап редактирования места


function addMestoOpen() {
    popupMesto.classList.toggle('popup_opened');
}//Открытие и закрытие попапа


 
//ниже пробую темплейт добавления карточки 

let elementGridContainer = document.querySelector('.elements__grid-container') //определил контейнер для темплейта 

let templateCard = document.querySelector('.template').content;//определил шаблон темплейт

createMesto.addEventListener('click', addNewMesto) //отслеживаем нажатие 

function addNewMesto(evt) {
    evt.preventDefault();
    let templateCardItem = templateCard.querySelector('li').cloneNode(true);//скопировал его содержимое 
    let templateImage = templateCardItem.querySelector('.element__image')//определил в скопированном шаблоне картинку
    let templateTitle = templateCardItem.querySelector('.element__caption-about')//определил заголовок в скопированом шаблоне
    templateImage.src = urlImageInput.value; //передаем велью из строк инпут
    templateTitle.textContent = nameImageInput.value //передаем велью из строк инпут
    elementGridContainer.prepend(templateCardItem)
}





