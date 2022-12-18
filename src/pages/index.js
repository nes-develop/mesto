import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

api.getUserInfo()
    .then(res => {
        //передаем по методу setUserInfo из класса UserInfo 
        userInfo.setUserInfo(res.name, res.about);
    })


api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const cardElement = createCard(data)
            defaultCardList.addItem(cardElement)
        });
    })

import {
    cardsContainer,
    initialCards,
    nameInput,
    professionInput,
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


//создаем API
// const api = new Api({
// 	url: 'https://mesto.nomoreparties.co/v1/cohort-55',
// 	headers: {
// 		authorization: '632a292c-702b-4f7c-9817-28c49bfdab1f',
// 		'Content-type': 'application/json'
// 	}
// })

//Создание карточки
const createCard = (item) => {
    //из класса Card 1 аргумент item, второй селектор шаблона, третий функция 
    const card = new Card(item, '.template', () => {
        handleCardClick(item.name, item.link);
    });
    return card.generateCard()
}

//добавление карточек при загрузке
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        defaultCardList.addItem(cardElement)
    },
},
    cardsContainer
);

defaultCardList.renderItems();

//popup с картинкой
const imageViewPopup = new PopupWithImage(popupImage);
imageViewPopup.setEventListeners();

function handleCardClick(name, link) {
    imageViewPopup.open(name, link);
}


//popup добавления карточки
const cardAddPopup = new PopupWithForm(popupAdd, (item) => {


    //добавляем api для добавление карточки
    api.addCard(item.name, item.link)
        .then(res => {
            //создание карточки 
            const newCard = createCard(res);
            //добавление карточки через класс Section
            defaultCardList.addItem(newCard);
            cardAddPopup.close();
        })



    validatorPopupAdd.disableSubmitButton();
});

cardAddPopup.setEventListeners();

//
popupAddOpen.addEventListener('click', function () {
    validatorPopupAdd.cleanError();
    //оставляем функцию disable, тк при заполнении формы и переоткрытии можно создать пустые
    validatorPopupAdd.disableSubmitButton(popupSubmitButton);
    cardAddPopup.open();

});

//popup редактирования профиля
const userInfo = new UserInfo({ username: popupName, job: popupProf });

//редактикирование профиля
const editProfilePopup = new PopupWithForm(popupEdit, (data) => {
    const { name, job } = data

    //вызываем метод api корректировки профиля
    api.editUserInfo(name, job)
        .then(res => {
            console.log('res', res)
            //через метод setUserInfo из класса UserInfo ставим значениея по name и job 
            userInfo.setUserInfo(name, job)

            //добавил временно для закрытия попапа, перенес в then чтобы только после ответа
            editProfilePopup.close()
        })
});
editProfilePopup.setEventListeners();

popupEditOpen.addEventListener('click', () => {

    //получаем методом getUserInfo из класса UserInfo значение из инпутов 
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    professionInput.value = info.about;
    validatorPopupEdit.cleanError();
    editProfilePopup.open();
});


//создаем новые классы валидации
const validatorPopupEdit = new FormValidator(validationConfig, popupForm);
validatorPopupEdit.enableValidation();
const validatorPopupAdd = new FormValidator(validationConfig, formAdd);
validatorPopupAdd.enableValidation();



