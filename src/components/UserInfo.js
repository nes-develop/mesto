export class UserInfo {
	constructor({username, job}) {
		this._username = username;
		this._job = job;
	}

	getUserInfo() {
		return {
			name: this._username.textContent,
			about: this._job.textContent,
		};
	}

	setUserInfo(data) {
		this._username.textContent = data.name;
		this._job.textContent = data.job;
	}
}
