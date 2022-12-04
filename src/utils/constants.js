export const initialCards = [
    {
        name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
];

//переменные попапа 
export const popupEdit = '.popup_edit'; //попап редактирования профиля
export const popupAdd = '.popup_add'; //попап добавления карточки
export const popupImage = '.popup_image';

export const popupEditOpen = document.querySelector('.profile__edit-form');
export const popupAddOpen = document.querySelector('.profile__add-item');

//переменные профиля
export const nameInput = document.querySelector('.popup__input_btn_name');
export const popupName = '.profile__name';
export const professionInput = document.querySelector('.popup__input_btn_title');
export const popupProf = '.profile__title';
export const popupForm = document.querySelector('.popup__content_edit');

//попап добавления
export const formAdd = document.querySelector('.popup__content_add');

export const cardInputName = document.querySelector('.popup__input_btn_destination');
export const cardInputLink = document.querySelector('.popup__input_btn_link');
export const popupSubmitButton = document.querySelector('.popup__submit-button')




export const cardsContainer = '.elements__item';

export const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__input_invalid',
    errorTextClass: 'popup__error',
};
