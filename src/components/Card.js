export class Card {
	constructor(data, templateSelector, handleCardClick, handleDeleteClick) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._id = data.id;

		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._templateSelector = templateSelector;
		this._element = this._getCard();
		this._image = this._element.querySelector('.cards__image');

	}
	//шаблон
	_getCard() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.cards')
			.cloneNode(true);

		return cardElement;
	}
	//генерим карточку
	generateCard() {
		this._setEventListeners(); //вызываем слушатели
		this._image.src = this._link;
		this._image.alt = this._name;
		this._element.querySelector('.cards__title').textContent = this._name;

		this._setLikes()

		return this._element;
	}
	//метод удаления карторчки
	deleteCard() {
		this._element.remove();
		this._element = null
	}

	//метод для лайков
	_setLikes() {
		const likeCountElement = this._element.querySelector('.cards__like_count')
		//кол-во лайков массив
		// likeCountElement.textContent = '0'
		likeCountElement.textContent = this._likes.length
	}

	_setEventListeners() {
		this._element.querySelector('.cards__like').addEventListener('click', (evt) => {
			evt.target.classList.toggle('cards__like_active')
		});

		this._element.querySelector('.cards__delete').addEventListener('click', () => this._handleDeleteClick(this._id));
		// 	this._element.remove();
		// 	this._element = null;
		// });

		this._image.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});
	}
}
