//объявляем все переменные по документу, используем cameCase
let page = document.querySelector('.page');
let content = page.querySelector('.content');
//переменные popup
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupFormElement = popup.querySelector('.popup__content');
let popupInputName = popupFormElement.querySelector('.popup__input_btn_name');
let popupInputTitle = popupFormElement.querySelector('.popup__input_btn_title');
//переменные секции profile
let profile = document.querySelector('.profile');
let profileForm = profile.querySelector('profile__form');
let profileName = profile.querySelector('.profile__name');
let profileTitle = profile.querySelector('.profile__title');
let profileEditForm = profile.querySelector('.profile__edit-form');


//функция по открытию popup из ТЗ, добавляем класс
function openPopup() {
    popup.classList.add('popup_opened');
    popupInputName.value = profileName.textContent;
    popupInputTitle.value = profileTitle.textContent;
}
profileEditForm.addEventListener('click', openPopup);

//функция аналогична открытию popup, удаляем класс
function closePopup() {
    popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', closePopup);

// функция из ТЗ по 
function submitInfo(evt) {
    evt.preventDefault(); //меняем действия браузера по умолчанию, например отправка формы на сервер
    profileName.textContent = popupInputName.value;
    profileTitle.textContent = popupInputTitle.value;;
    closePopup();
}
popupFormElement.addEventListener('submit', submitInfo);