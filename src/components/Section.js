export class Section {
	constructor({ renderer }, container) {
		// this._items = items; // items это массив initialCards.
		this._renderer = renderer;
		this._container = container;
	}

	renderItems(items) {
		items.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(cardData) {
		this._container.prepend(cardData);
	}
}