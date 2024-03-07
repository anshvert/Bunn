export interface User {
    username: string,
    password: string
}

export interface LoggedInUserInfo {
    isLoggedIn: boolean,
    data?: User
}