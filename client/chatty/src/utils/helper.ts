import { LoggedInUserInfo } from "../interfaces/interfaces";

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