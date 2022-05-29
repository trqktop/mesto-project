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


//Шесть карточек «из коробки»
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
];



//добавляем новое место по кнопке добавить




createMesto.addEventListener('click', addNewMesto)

function addNewMesto(evt) {
    evt.preventDefault();

    let elementGridContainer = document.querySelector('.elements__grid-container')//нашел контейнер
    let elementCard = document.querySelector('.element')//нашел елемент
    let elementNewCardContainer = document.createElement('li')//добавляю елемент в контейнер
    let elementNewCard = document.createElement('figure')//создал карточку для заливки в нее стилей
    elementNewCard.innerHTML = elementCard.innerHTML //скопировал каркас хтмл с готовой карточки
    elementNewCard.classList.add('element') //добавил класс для подтягивания стилей
    elementGridContainer.prepend(elementNewCardContainer) //добавляю на страницу елемент при клике 
    elementNewCardContainer.append(elementNewCard) //добавляю на страницу елемент при клике 


    let urlImageInput = document.querySelector('#urlImageInput')//ищем строку ввода ссылки на картинку
    let elementCardImage = elementNewCardContainer.querySelector('.element__image')//ищем в созданой выше карточке класс картинки
    elementCardImage.setAttribute('src', urlImageInput.value) //передаем с инпута в картинку ссылку

    let elementCaptionAbout = elementNewCardContainer.querySelector('.element__caption-about') //ищем в созданой карточке загловок
    let nameImageInput = document.querySelector('#nameImageInput') //ищем строку ввода для заголовка
    elementCaptionAbout.textContent = nameImageInput.value //передаем значение строки ввода в заголовок


}



