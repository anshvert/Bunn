import { createStore } from 'solid-js/store'

const [user, setUser] = createStore()

export const useUserState = () => [user,setUser]