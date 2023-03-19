export class UserInfo {
    constructor({currentNameSelector, currentOccupationSelector}) {
        this._userName = document.querySelector(currentNameSelector);
        this._userOccupation = document.querySelector(currentOccupationSelector);
    }

    getUserInfo() {
        const userInformation = {name: this._userName, job: this._userOccupation};
        return userInformation;
    }

    setUserInfo(nameInput, jobInput) {
        this._userName.textContent = nameInput;
        this._userOccupation.textContent = jobInput;
    }
}