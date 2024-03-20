import { useSearchModal, useSearchQuery } from "../stores/searchState";
import {createEffect, createSignal} from "solid-js";
import axios from "axios";
import { serverURLs } from "../config";
import { ENV } from "../utils/constants";
import { useUserState } from "../stores/userState";
import "../styles/searchModal.scss"

const searchModal = () => {

    const [user, setUser] = useUserState()
    const [isSearchModalOpen, setIsSearchModalOpen] = useSearchModal()
    const [searchQuery, setSearchQuery] = useSearchQuery()
    const [userSearchData, setUserSearchData] = createSignal([])
    const [messageSearchData, setMessageSearchData] = createSignal([])

    const handleModalClose = () => {
        setIsSearchModalOpen(false)
    }

    createEffect(async (): Promise<void> => {
        const searchBody = { searchQuery: searchQuery(), userData: user }
        const searchResult = await axios.post(`${serverURLs[ENV]}api/search`,searchBody)
        const { messageData, userData } = searchResult.data
        setUserSearchData(userData)
        setMessageSearchData(messageData)
    },[searchQuery()])

    return (
        <>
            <div class={`modal ${isSearchModalOpen() ? 'open' : ''}`}>
                <div class={`modalHeader`}>
                    <h1>{`You searched for : ${searchQuery()}`}</h1>
                </div>
                <button onClick={handleModalClose}>&times;</button>
                <div class={`modalBody`}>
                    <div class={`modalColumn`}>
                        <h2>Users</h2>
                        {userSearchData().map((user) => (
                            <div>
                                {user.username}
                            </div>
                        ))}
                    </div>
                    <div class={`modalColumn`}>
                        <h2>Messages</h2>
                        {messageSearchData().map((message) => (
                            <div>
                                {message.message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default searchModal