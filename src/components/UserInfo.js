export class UserInfo {
	constructor({ nameSelector, aboutSelector }) {
		this._lastName = document.querySelector(nameSelector);
		this._about = document.querySelector(aboutSelector);
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
	// setUserInfo(title, job) {
	// 	this._lastName.textContent = title;
	// 	this._about.textContent = job;
	// }
}
