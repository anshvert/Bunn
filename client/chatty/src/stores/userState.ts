import { onMount } from "solid-js";
import { createStore } from "solid-js/store";

const userStore = createStore()

export const UserService = () => {
    const [user, setUser] = userStore
    onMount(() => {
        const userString = localStorage.getItem("user")
        if (userString) return
        console.log('onMount setting User Details')
        setUser(() => {
            JSON.parse(userString)
        })
    })

    const updateUser = (user) => {
        setUser(() => user)
        localStorage.setItem('user',JSON.stringify(user))
    }

    return { user, updateUser }
}