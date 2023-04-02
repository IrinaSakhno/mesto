export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.apiToken = options.headers.authorization;
      this.contentType = options.headers.contentType;
    }
  
    _getResponseData(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfile() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        }
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
          method: 'GET',
          headers: {
            authorization: this.apiToken,
            "Content-Type": this.contentType
          }
        })
          .then(res => {
            return this._getResponseData(res);
          });
    } 

    editProfile({name, about}) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }

    addNewCard({name, link}) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }

    putLike(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        }
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }

    removeLike(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        }
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }
    
    deleteCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        }
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }

    changeAvatar(avatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this.apiToken,
          "Content-Type": this.contentType
        },
        body: JSON.stringify({
          avatar: avatar,
        })
      })
        .then(res => {
          return this._getResponseData(res);
        });
    }
  
    

  }
  
  