export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.apiToken = options.headers.authorization;
      this.contentType = options.headers.contentType;
    }
  

    getProfile() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this.apiToken,
          contentType: this.contentType
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
          method: 'GET',
          headers: {
            authorization: this.apiToken,
            contentType: this.contentType
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    } 

    editProfile() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.apiToken,
          contentType: this.contentType
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addNewCard() {

    }

    getLikes() {

    }
    
    deleteCard() {

    }

    like() {

    }

    changeAvatar() {

    }
  
    

  }
  
  