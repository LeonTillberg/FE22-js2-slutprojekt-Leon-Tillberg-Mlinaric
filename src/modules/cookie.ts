const setCookie = (name: string, value: string, expires: any): void => {
    document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
}

const getCookie = (name: string): string => {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}

export { setCookie, getCookie }