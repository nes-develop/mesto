export class Section {
	constructor({ items, renderer }, selectorContainer) {
		this._items = items; // items это массив initialCards.
		this.renderer = renderer;
		this._container = document.querySelector(selectorContainer);
	}

	renderItems() {
		this._items.forEach((item) => {
			this.renderer(item);
		});
	}

	addItem(cardData) {
		this._container.prepend(cardData);
	}
}