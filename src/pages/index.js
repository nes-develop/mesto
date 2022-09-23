import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import {
    cardsContainer,
    initialCards,
    popupForm,
    popupAdd,
    popupAddOpen,
    popupEdit,
    popupEditOpen,
    popupImage,
    formAdd,
    popupName,
    popupProf,
    validationConfig,
    popupSubmitButton
} from '../utils/constants.js';

//Создание карточки
function createCard(item) {
    const card = new Card(item, '.template', handleCardClick);
    defaultCardList.addItem(card.generateCard());
}

//добавление карточек при загрузке
const defaultCardList = new Section({
    items: initialCards,
    renderer: createCard
},
    cardsContainer);

defaultCardList.renderItems(initialCards);

//popup с картинкой
const imageViewPopup = new PopupWithImage(popupImage);
imageViewPopup.setEventListeners();

function handleCardClick(name, link) {
    imageViewPopup.open(name, link);
}


//popup добавления карточки
const addCardPopup = new PopupWithForm(popupAdd, (dataInputs) => {
    defaultCardList.renderer(dataInputs);//
});

addCardPopup.setEventListeners();

//
popupAddOpen.addEventListener('click', function () {
    validatorPopupAdd.cleanError();
    //оставляем функцию disable, тк при заполнении формы и переоткрытии можно создать пустые
    validatorPopupAdd.disableSubmitButton(popupSubmitButton);
    addCardPopup.open();

});

//popup редактирования профиля
const user = new UserInfo({ NameSelector: popupName, AboutSelector: popupProf });
const editProfilePopup = new PopupWithForm(popupEdit, (dataInputs) => {
    user.setUserInfo(dataInputs);
});

editProfilePopup.setEventListeners();

popupEditOpen.addEventListener('click', () => {
    editProfilePopup.setInputValues(user.getUserInfo());
    validatorPopupEdit.cleanError();
    editProfilePopup.open();
});


//создаем новые классы валидации
const validatorPopupEdit = new FormValidator(validationConfig, popupForm);
validatorPopupEdit.enableValidation();
const validatorPopupAdd = new FormValidator(validationConfig, formAdd);
validatorPopupAdd.enableValidation();



