export class UserInfo {
    constructor({currentName, currentOccupation}) {
        this._userName = currentName;
        this._userOccupation = currentOccupation;
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