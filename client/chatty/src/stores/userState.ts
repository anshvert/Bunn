import { createStore } from 'solid-js/store'

const [userState, setUserState] = createStore()

export const useUserState = () => [userState,setUserState]