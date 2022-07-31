//работает console.log('Проверка подключения JS');
//объявляем все переменные по документу, используем cameCase
let page = document.querySelector('.page');
let content = page.querySelector('.content');
//переменные popup
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupInputName = popup.querySelector('#input-name');
let popupInputTitle = popup.querySelector('#input-title');
let popupSubmitButton = popup.querySelector('.popup__submit-button');
//переменные секции зкщашду
let profile = content.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__name');
let profileTitle = profile.querySelector('.profile__title');
let profileEditForm = profileInfo.querySelector('.profile__edit-form');
let profileAddButton = profile.querySelector('.profile__add-item');

//функция по открытию popup из ТЗ, добавляем класс
function openPopup() {
    popup.classList.add('popup__opened');
    //работает
    // console.log('проверка функции открытия popup')
}

//функция аналогична открытию popup, удаляем класс
function closePopup() {
    popup.classList.remove('popup__opened');
    //работает
    // console.log('проверка функции закрытия popup')
}

// функция из ТЗ по 
function submitInfo (evt) {
    //работает
    // console.log('проверка функции кнопки сохранить');
    evt.preventDefault(); //меняем действия браузера по умолчанию, например отправка формы на сервер
    let InputName = popupInputName.value;
    let InputTitle = popupInputTitle.value;
    profileName.textContent = InputName;
    profileTitle.textContent = InputTitle;
    closePopup();
}

profileEditForm.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSubmitButton.addEventListener('click', submitInfo);