import { displayAllPosts } from './modules/usersStatus';
import { getUsers } from './modules/userlist';
import { showProfile } from './modules/showuser';
import { showAccount } from './modules/displaylogin';
import { deleteProfile } from './modules/delete';
import { setCookie, getCookie } from './modules/cookie';

const loginUsername:string = getCookie('loginCookie');
const deleteBtn = document.querySelector('.delete-account') as HTMLButtonElement;

deleteBtn.addEventListener('click', async () => {
    await deleteProfile(loginUsername);
    setCookie('loginCookie', '', new Date(0));
    window.location.assign('./login.html');
});

window.addEventListener('load', () => {
    showAccount();
    getUsers();
    displayAllPosts();
    showProfile();
});

