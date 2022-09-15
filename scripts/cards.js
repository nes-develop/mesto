export class Card {
	constructor(name, link, handleOpenPopup, templateSelector) {
		this._name = name;
		this._link = link;
		this._handleOpenPopup = handleOpenPopup;
		this._templateSelector = templateSelector;
	}
	//ниже описываем методы валидации карточки
	//получаем шаблон
	_getCard() {
		const cardElement = document.querySelector(this._templateSelector)
			.content
			.cloneNode(true);
		return cardElement;
	}
	//генерим карточку
	generateCard() {
		this._element = this._getCard();
		this._cardDelete = this._element.querySelector('.cards__delete');
		this._cardLike = this._element.querySelector('.cards__like');
		this._cardImage = this._element.querySelector('.cards__image');
		this._cardTitle = this._element.querySelector('.cards__title');

		this._cardTitle.textContent = this._name;
		this._cardImage.alt = this._name;
		this._cardImage.src = this._link;

		this._cardLike.addEventListener('click', () => {
			this._handleLike(event)
		});
		this._cardDelete.addEventListener('click', this._handleDelete);
		// cardDelete.addEventListener('click', () => {
		// 	this._handleDelete()
		// });
		this._cardImage.addEventListener('click', () => {
			this._handleOpenPopup(this._name, this._link)
		});

		return this._element;

	}

	renderCard(container) {
		container.prepend(this._element);
	}

	//приватный метод ставим лайк
	_handleLike(event) {
		const buttonLike = event.target;
		buttonLike.classList.toggle('cards__like_active');

	}
	//приватный метод удаления карточки
	_handleDelete(event) {
		this._cards = event.target.closest('.cards');
		this._cards.remove();
		this._element = null;
	}

}




