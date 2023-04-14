import { getCookie } from "./cookie";
const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const username = getCookie('profileCookie');
console.log('userCookie', username)

const showProfile = async (): Promise<any> => {
    const url = firebaseUrl + `Profiles/${username}/info.json`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const container = document.querySelector('.showuser-container') as HTMLElement;

    const imgElement = document.createElement('img');
    const imgUrl = new URL(data.picture, import.meta.url);
    imgElement.src = imgUrl.href;
    imgElement.classList.add('showuser-pic');
    container.append(imgElement);

    const nameElement = document.createElement('h3');
    nameElement.innerText = data.name;
    nameElement.classList.add('showuser-name');
    container.append(nameElement);
}

export { showProfile };
