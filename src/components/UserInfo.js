export class UserInfo {
	constructor({ NameSelector, AboutSelector }) {
		this._lastName = document.querySelector(NameSelector);
		this._about = document.querySelector(AboutSelector);
	}

	getUserInfo() {
		return {
			lastName: this._lastName.textContent,
			about: this._about.textContent,
		}
	}

	setUserInfo(data) {
		this._lastName.textContent = data.lastName;
		this._about.textContent = data.about;
	}
}

