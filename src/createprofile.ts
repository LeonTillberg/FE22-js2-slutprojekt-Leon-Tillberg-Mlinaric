const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const createBtn = document.querySelector('.create-btn') as HTMLButtonElement;
const profilePicContainer = document.querySelector('.profile-pic-container') as HTMLElement;
const pictureInput = document.querySelector('.picture') as HTMLInputElement;

profilePicContainer.addEventListener('click', selectProfilePic);
createBtn.addEventListener('click', getInfo);

function getInfo(event) {
    event.preventDefault();

    const usernameInput = document.querySelector('.username') as HTMLInputElement;
    const username = usernameInput.value;

    const passwordInput = document.querySelector('.password') as HTMLInputElement;
    const password = passwordInput.value;

    const pictureInput = document.querySelector('.picture') as HTMLInputElement;
    const picture = pictureInput.value;

    if (!username || !password || !picture) {
        alert('Please enter all the required information.');
        return;
    }

    updateAccount(username, password, picture);
}

const updateAccount = async (username: string, password: string, picture: string): Promise<any> => {
    const url = firebaseUrl + 'Profiles/' + username + '/info.json';

    const newUser = {
        name: username,
        password: password,
        picture: picture
    };

    const init = {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    const response = await fetch(url, init);
    const data = await response.json();

    window.location.assign('index.html');
}

function selectProfilePic(event) {
    if (event.target.tagName === 'IMG') {
        const img = event.target as HTMLImageElement;
        pictureInput.value = img.src;

        const allPictures = profilePicContainer.querySelectorAll('img');
        allPictures.forEach((picture) => {
            picture.classList.remove('selected');
        });
        img.classList.add('selected');
    }
}