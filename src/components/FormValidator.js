export class FormValidator {
	constructor(config, form) {
		this._config = config;
		this._form = form;
		this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
		this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);

	}

	enableValidation() {
		this._setEventListeners();
	}

	_setEventListeners() {
		// this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._toggleInputError(inputElement);
				this._toggleButtonState();
			});
		});
	}

	_toggleInputError(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_showInputError(inputElement, errorMessage) {
		this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._config.inputErrorSelector);
		this._errorElement.classList.add(this._config.errorTextClass);
		this._errorElement.textContent = errorMessage; //
	}

	_hideInputError(inputElement) {
		this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._config.inputErrorSelector);
		this._errorElement.classList.remove(this._config.errorTextClass); //
		this._errorElement.textContent = '';
	}

	_hasInvalidInput() {
		return this._inputList.some((input) => {
			return !input.validity.valid;
		});
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this.disableSubmitButton();
			// this._buttonElement.setAttribute('disabled', true);
			// this._buttonElement.classList.add(this._config.inactiveButtonClass);
		} else {
			this._buttonElement.removeAttribute('disabled');
			this._buttonElement.classList.remove(this._config.inactiveButtonClass);
		}
	}

	cleanError() {
		this._errors = this._form.querySelectorAll(`.${this._config.errorTextClass}`);
		this._errors.forEach((error) => {
			error.classList.remove(this._config.errorTextClass);
		})
		this._inputErrors = document.querySelectorAll(`.${this._config.inputErrorClass}`);
		this._inputErrors.forEach((inputError) => {
			inputError.classList.remove(this._config.inputErrorClass);
		})
	}


	disableSubmitButton() {
		this._buttonElement.setAttribute('disabled', true);
		this._buttonElement.classList.add(`${this._config.inactiveButtonClass}`);
		// button.setAttribute('disabled', true);
		// button.classList.add(`${this._config.inactiveButtonClass}`);
	}

}
