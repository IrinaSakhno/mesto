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
          "Content-Type": this.contentType
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
            "Content-Type": this.contentType
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
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
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
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
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        });
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
  
  