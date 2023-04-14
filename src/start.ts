import {setCookie} from './modules/cookie'

const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const username = document.querySelector('.username-login') as HTMLInputElement;
const password = document.querySelector('.password-login') as HTMLInputElement;
const loginButton = document.querySelector('.login-btn') as HTMLButtonElement;
const createBtn = document.querySelector('.create-btn') as HTMLButtonElement;

createBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    window.location.assign('./createprofile.html');
})

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    tryLogIn(usernameValue, passwordValue);

});

const tryLogIn = async (usernameValue: string, passwordValue: string): Promise<any> => {
    const url = firebaseUrl + `Profiles/${usernameValue}/info.json`;

    const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log(data);

    if (response.ok && data.password === passwordValue) {
        const expires = new Date(Date.now() + 3600 * 1000);
        setCookie('loginCookie', usernameValue, expires);
        window.location.assign('./main.html');
    } else {
        alert("Wrong username or password!");
    }
}