export class UserInfo {
    constructor({currentNameSelector, currentOccupationSelector, avatarSelector}) {
        this._userName = document.querySelector(currentNameSelector);
        this._userOccupation = document.querySelector(currentOccupationSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInformation = {name: this._userName, job: this._userOccupation};
        return userInformation;
    }

    setUserInfo(nameInput, jobInput) {
        this._userName.textContent = nameInput;
        this._userOccupation.textContent = jobInput;
    }

    setUserAvatar(avatarLink) {
        this._userAvatar.src = avatarLink;
    }

    setUserId(id) {
        this._userId = id;
    }

    getUserId() {
        return this._userId;
    }
}