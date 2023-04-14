import { getCookie } from "./cookie";
const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const username = getCookie("profileCookie");

window.onload = function () {
    displayAllPosts();
}

const viewPost = async (newStatus: any) => {
    const divs = document.createElement('div');
    divs.classList.add('status');
    document.querySelector('.old-status')?.append(divs);

    const infoUrl = firebaseUrl + `Profiles/${username}/info.json`;
    const infoResponse = await fetch(infoUrl);
    const infoData = await infoResponse.json();

    const imgElement = document.createElement('img');
    const imgUrl = new URL(infoData.picture, import.meta.url);
    imgElement.src = imgUrl.href;
    imgElement.classList.add('status-pic');
    divs.append(imgElement);

    const name = document.createElement('h4');
    name.innerText = infoData.name + ":";
    name.classList.add('status-name');
    divs.append(name);

    const status = document.createElement('p');
    status.classList.add('post');
    status.innerText = newStatus.post;
    status.classList.add('post');
    divs.append(status);
};

const displayAllPosts = async () => {
    const url = firebaseUrl + `Profiles/${username}/Statuses.json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data) {
        const postArray = Object.values(data);

        postArray.sort((a: any, b: any) => b.timestamp - a.timestamp);

        const oldStatusContainer = document.querySelector('.old-status') as HTMLElement;
        oldStatusContainer.innerHTML = '';

        for (let i = 0; i < postArray.length; i++) {
            const post = postArray[i];
            viewPost(post);
        }
    }
};

export { displayAllPosts };

