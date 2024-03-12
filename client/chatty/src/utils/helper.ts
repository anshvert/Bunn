import { LoggedInUserInfo } from "../interfaces/interfaces";
import avatar1 from "../assets/avatars/avatar1.jpeg";
import avatar2 from "../assets/avatars/avatar2.jpeg";
import avatar3 from "../assets/avatars/avatar3.jpeg";
import avatar4 from "../assets/avatars/avatar4.jpeg";
import avatar5 from "../assets/avatars/avatar5.jpeg";
import avatar6 from "../assets/avatars/avatar6.jpeg";

export const isLoggedIn = (): LoggedInUserInfo => {
    const userInfo: string = localStorage.getItem("BNY:User")
    if (!userInfo) {
        return {
            isLoggedIn: false
        }
    }
    return {
        isLoggedIn: true,
        data: JSON.parse(userInfo)
    }
}

export const logOutUser = (): void => {
    localStorage.removeItem("BNY:User")
}

export const getRandomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 6 ) + 1
    switch (randomNumber) {
        case 1:
            return avatar1;
        case 2:
            return avatar2;
        case 3:
            return avatar3;
        case 4:
            return avatar4;
        case 5:
            return avatar5;
        case 6:
            return avatar6;
        default:
            return null;
    }
}

export const isDevEnv = (): boolean => {
    const currentUrl: string = import.meta.url
    return currentUrl.includes("local")
}