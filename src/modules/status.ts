import { getCookie } from "./cookie";
const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const username = getCookie('loginCookie');

const postBtn = document.querySelector(".post-btn") as HTMLButtonElement;
postBtn.addEventListener('click', getPost);

window.onload = function () {
    displayAllPosts();
}

function getPost(event) {
    event.preventDefault();

    const inputStatus = document.querySelector(".status-input") as HTMLInputElement;
    const status = inputStatus.value;

    addPost(status)
        .then(() => {
            inputStatus.value = "";
            location.reload();
        });
}

const addPost = async (status: string): Promise<any> => {
    const url = firebaseUrl + `Profiles/${username}/Statuses.json`;

    const newStatus = {
        post: status,
        timestamp: Date.now()
    };

    const init = {
        method: "POST",
        body: JSON.stringify(newStatus),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    const response = await fetch(url, init);
    const data = await response.json();

    const infoUrl = firebaseUrl + `Profiles/${username}/info.json`;
    const infoResponse = await fetch(infoUrl);
    const infoData = await infoResponse.json();

    viewPost({ post: status, name: infoData.name, picture: infoData.picture });
}

const viewPost = async (newStatus: any): Promise<any> => {
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

    const post = document.createElement('p');
    post.innerText = newStatus.post;
    post.classList.add('post');
    divs.append(post);
}

const displayAllPosts = async (): Promise<any> => {
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
}

export { addPost, viewPost, displayAllPosts };