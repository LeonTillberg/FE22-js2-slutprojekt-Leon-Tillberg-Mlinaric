import { setCookie, getCookie } from "./cookie";

const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const loginUsername: string = getCookie('loginCookie');

const getUsers = async (): Promise<any> => {
    const url = firebaseUrl + `Profiles.json`;

    const response = await fetch(url);
    const data = await response.json();

    const userList = document.querySelector('.user-list') as HTMLElement;
    userList.innerHTML = "";

    for (const username in data) {
        // if (username === loginUsername) {
        //     continue;
        // }
        const divs = document.createElement('div');
        divs.classList.add('user');
        userList.append(divs);

        const profileUrl = firebaseUrl + `Profiles/${username}/info.json`;
        const profileResponse = await fetch(profileUrl);
        const profileData = await profileResponse.json();

        const imgElement = document.createElement('img');
        const imgUrl = new URL(profileData.picture, import.meta.url);
        imgElement.src = imgUrl.href;
        imgElement.classList.add('userlist-picture');
        divs.append(imgElement);

        const nameElement = document.createElement('p');
        nameElement.innerText = profileData.name;
        nameElement.addEventListener('click', () => {
            const expires = new Date(Date.now() + 3600 * 1000);
            setCookie('profileCookie', username, expires);
            window.location.assign('./profile.html');
        });
        nameElement.classList.add('userlist-name');
        divs.append(nameElement);
    }
}

export { getUsers };
