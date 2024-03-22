import { useSearchModal, useSearchQuery } from "../stores/searchState";
import {createEffect, createSignal} from "solid-js";
import axios from "axios";
import { serverURLs } from "../config";
import { ENV } from "../utils/constants";
import { useUserState } from "../stores/userState";
import "../styles/searchModal.scss"
import {useSelectedFriend} from "../stores/friendState";

const searchModal = () => {

    const [user, setUser] = useUserState()
    const [isSearchModalOpen, setIsSearchModalOpen] = useSearchModal()
    const [searchQuery, setSearchQuery] = useSearchQuery()
    const [userSearchData, setUserSearchData] = createSignal([])
    const [messageSearchData, setMessageSearchData] = createSignal([])
    const [selectedFriend, setSelectedFriend] = useSelectedFriend()

    const handleModalClose = (): void => {
        setIsSearchModalOpen(false)
    }

    const handleMessageClick  = (msg): void => {
        const reDirectFriend = msg.sender === user.username ? msg.receiver : msg.sender
        setSelectedFriend(reDirectFriend)
        handleModalClose()
    }

    const handleUserClick = async (clickedUser): Promise<void> => {
        setSelectedFriend(clickedUser.username)
        const reqBody = { sender: user.username, receiver: clickedUser.username, status: "accepted" }
        await axios.post(`${serverURLs[ENV]}api/message/request`, reqBody)
        handleModalClose()
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
                {/*<button onClick={handleModalClose}>&times;</button>*/}
                <div class={`modalBody`}>
                    {userSearchData().length && (
                        <div class={`modalColumn`}>
                            <h2>Users</h2>
                            {userSearchData().map((user) => (
                                <div class={`modalUser`}>
                                    <div>{user.username}</div>
                                    <button class={`modalUserBtn`} onClick={() => handleUserClick(user)}>Chat</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {messageSearchData().length && (
                        <div class={`modalColumn`}>
                            <h2>Messages</h2>
                            {messageSearchData().map((message) => (
                                <div onclick={() => handleMessageClick(message)}>
                                    {message.sender === user.username ? (
                                        <span>You: </span>) : (
                                        <span>{message.sender}: </span>
                                    )}
                                    {message.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default searchModal