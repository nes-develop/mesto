export class Card {
	constructor(name, link, handleOpenPopup) {
		this._name = name;
		this._link = link;
		this._handleOpenPopup = handleOpenPopup;
	}
    //ниже описываем методы валидации карточки
	//получаем шаблон
	_getCard() {
		return document
			.querySelector('.template')
			.content.querySelector('.cards').cloneNode(true)
	}
	//генерим карточку
	generateCard() {
		this._element = this._getCard();

		const cardDelete = this._element.querySelector('.cards__delete');
		const cardLike = this._element.querySelector('.cards__like');
		const cardImage = this._element.querySelector('.cards__image');
		const cardTitle = this._element.querySelector('.cards__title');

		cardTitle.textContent = this._name;
		cardImage.alt = this._name;
		cardImage.src = this._link;

		cardLike.addEventListener('click', this._handleLike);
		cardDelete.addEventListener('click', this._handleDelete);
		cardImage.addEventListener('click', () => {
			this._handleOpenPopup(this._name, this._link)
		});

		return this._element;

	}
	//приватный метод ставим лайк
	_handleLike(event) {
		const buttonLike = event.target;
		buttonLike.classList.toggle('cards__like_active');
	}
	//приватный метод ставим убираем лайк
	_handleDelete(event) {
		this._element = event.target.closest('.cards');
		this._element.remove();
	}

}


//старый код
// const initialCards = [
// 	{
// 		name: 'Архыз',
// 		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
// 	},
// 	{
// 		name: 'Челябинская область',
// 		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
// 	},
// 	{
// 		name: 'Иваново',
// 		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
// 	},
// 	{
// 		name: 'Камчатка',
// 		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
// 	},
// 	{
// 		name: 'Холмогорский район',
// 		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
// 	},
// 	{
// 		name: 'Байкал',
// 		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
// 	},
// ];





