export class Card {
	constructor(data, templateSelector, handleCardClick) {
		this._name = data.name;
		this._link = data.link;
		this._handleCardClick = handleCardClick;
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

		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.cards__like').addEventListener('click', (evt) => {
			evt.target.classList.toggle('cards__like_active')
		});

		this._element.querySelector('.cards__delete').addEventListener('click', () => {
			this._element.remove();
			this._element = null;
		});

		this._image.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});
	}
}
