import { getCookie, setCookie } from "./cookie";
const firebaseUrl: string = "https://js2-slutprojekt-fdba7-default-rtdb.europe-west1.firebasedatabase.app/";

const loginUsername:string = getCookie('loginCookie');

async function deleteProfile(username: string): Promise<any> {
    const profileUrl = firebaseUrl + `Profiles/${username}.json`;
    const profileResponse = await fetch(profileUrl, { method: 'DELETE' });

    return;
}

document.addEventListener('DOMContentLoaded', () => {
    const deleteBtn = document.querySelector('.delete-account') as HTMLButtonElement;
    
    deleteBtn.addEventListener('click', async () => {
        await deleteProfile(loginUsername);
        // setCookie('loginCookie', '', new Date(0));
        window.location.assign('./index.html');
    });
});

export {deleteProfile};