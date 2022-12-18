export class UserInfo {
	constructor({ username, job }) {
		this._username = username;
		this._job = job;
	}

	getUserInfo() {
		return {
			//поправить
			name: this._username.textContent,
			about: this._job.textContent,
		}
	}

	setUserInfo(name, about) {
		this._username.textContent = name;
		this._job.textContent = about;
	}
	// setUserInfo(title, job) {
	// 	this._lastName.textContent = title;
	// 	this._about.textContent = job;
	// }
}
