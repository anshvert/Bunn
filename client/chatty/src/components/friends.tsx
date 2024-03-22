import { createEffect, createSignal } from "solid-js";
import { LoggedInUserInfo, User } from "../interfaces/interfaces";
import {getRandomAvatar, isDevEnv, isLoggedIn} from "../utils/helper";
import axios from "axios";
import { serverURLs } from "../config";
import ws from "../bin/socket";
import { useSelectedFriend } from "../stores/friendState";
import { useUserState } from "../stores/userState";
import { useNavigate } from "@solidjs/router";
import "../styles/friends.css"
import { ENV } from "../utils/constants";
import {useLastMessage} from "../stores/messageState";

const Friends = () => {

    const [friends, setFriends] = createSignal([])
    const [selectedFriend, setSelectedFriend] = useSelectedFriend()
    const [user,setUser] = useUserState()
    const [lastMessageMap, setLastMessageMap] = useLastMessage()
    const navigate = useNavigate()

    const openChat = (friend) => {
        setSelectedFriend(friend)
    }

    createEffect(async (): Promise<void> => {
        const userData: LoggedInUserInfo = isLoggedIn()
        if (!userData.isLoggedIn) {
            navigate("/onboard",{ replace: true })
            return
        }
        setUser(userData.data as User)
        const friendList = await axios.post(`${serverURLs[ENV]}api/user/friends`,user)
        const friendUsernames = friendList.data.map((friend) => friend.sender !== user.username ? friend.sender : friend.receiver)
        setFriends(friendUsernames)
        setSelectedFriend(friendUsernames[0])
        const lastMessageData = await axios.post(`${serverURLs[ENV]}api/message/retrieve/last`,{ friends: friends() })
        setLastMessageMap(lastMessageData.data)
        const subscribeData = { action: "subscribe", topics: [user.username] }
        ws.send(JSON.stringify(subscribeData))
    },[selectedFriend()])

    return (
    <>
        <ul class="friends-list">
            {friends().map((friend, index) => (
                <li key={index} class={`friend-item ${selectedFriend() === friend ? 'selected': ''}`} onclick={() => openChat(friend)}>
                    <div class="friend-info">
                        <img src={getRandomAvatar() as string} alt={"No Image Daym"} class="friend-avatar" />
                        <div class="friend-details">
                            <h3 class="friend-name">{friend}</h3>
                            <p class="last-message">{lastMessageMap[friend]}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </>
);

}

export default Friends