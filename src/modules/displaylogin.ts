import { getCookie } from "./cookie";
const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const username = getCookie('loginCookie');
console.log('loginCookie', username);

const profileImg = document.querySelector('.profile-picture') as HTMLImageElement;
const profileName = document.querySelector('.profile-name') as HTMLElement;

const showAccount = async (): Promise<any> => {
    const url = firebaseUrl + `Profiles/${username}/info.json`;

    const response = await fetch(url);
    const data = await response.json();

    profileName.textContent = data.name;
    profileName.addEventListener('click', () => {
        location.assign('./main.html');
    });

    const imgElement = document.createElement('img');
    const imgUrl = new URL(data.picture, import.meta.url);
    imgElement.src = imgUrl.href;
    imgElement.classList.add('account-img');
    imgElement.addEventListener('click', () => {
        location.assign('./main.html');
    });
    profileImg.append(imgElement);
}

export { showAccount }