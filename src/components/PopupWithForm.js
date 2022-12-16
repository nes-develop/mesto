import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(selectorPopup, handleSubmitForm) {
		super(selectorPopup);
		this._handleSubmitForm = handleSubmitForm;
		//дубль из родительского класса
		// this._popup = document.querySelector(selectorPopup);
		this._popupForm = this._popup.querySelector('.popup__content');
		this._inputList = this._popupForm.querySelectorAll('.popup__input');
	}

	_getInputValues() {
		const formValues = {};
		//ищем 
		this._inputList.forEach(input => {
			//ищем по ключу name из верстки, делая массив руками и вставляем значение value
			formValues[input.getAttribute('name')] = input.value;
		});

		return formValues;
	}

	setInputValues(data) {
		this._inputList.forEach((input) => {
			input.value = data[input.name];
		});
	}

	setEventListeners() {
		//вызываем родительский метод через super
		super.setEventListeners();
		this._popupForm.addEventListener('submit', (event) => {
			event.preventDefault();
			this._handleSubmitForm(this._getInputValues());
			this.close();
		})
	}

	close() {
		//вызываем родительский метод через super
		super.close();
		this._popupForm.reset();
	}
}
