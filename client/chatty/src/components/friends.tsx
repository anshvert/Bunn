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

const Friends = () => {

    const [friends, setFriends] = createSignal([])
    const [selectedFriend, setSelectedFriend] = useSelectedFriend()
    const [user,setUser] = useUserState()
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
        console.log(friendList)
        const friendUsernames = friendList.data.map((friend) => friend.sender !== user.username ? friend.sender : friend.receiver)
        setFriends(friendUsernames)
        setSelectedFriend(friendUsernames[0])
        const subscribeData = { action: "subscribe", topics: [user.username] }
        ws.send(JSON.stringify(subscribeData))
    },[])

    return (
    <>
        <ul class="friends-list">
            {friends().map((friend, index) => (
                <li key={index} class={`friend-item ${selectedFriend() === friend ? 'selected': ''}`} onclick={() => openChat(friend)}>
                    <div class="friend-info">
                        <img src={getRandomAvatar() as string} alt={"No Image Daym"} class="friend-avatar" />
                        <div class="friend-details">
                            <h3 class="friend-name">{friend}</h3>
                            <p class="last-message">{"Lamba hai bhai lamba"}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </>
);

}

export default Friends