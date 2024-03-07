import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import Chat from "./components/chat";
import { useUserState } from "./stores/userState";
import { useSelectedFriend } from "./stores/friendState";
import { useNavigate } from "@solidjs/router";
import { serverURLs } from "./config";
import NavBar from "./components/navBar";
import { isLoggedIn } from "./utils/helper";
import { LoggedInUserInfo, User } from "./interfaces/interfaces";
import axios from 'axios';
import ws from "./bin/socket";
import "./styles/home.css"

const App: Component = () => {
    const [friends, setFriends] = createSignal([])
    const [user,setUser] = useUserState()
    const [selectedFriend, setSelectedFriend] = useSelectedFriend()
    const navigate = useNavigate()

    createEffect(async (): Promise<void> => {
        const userData: LoggedInUserInfo = isLoggedIn()
        if (!userData.isLoggedIn) {
            navigate("/onboard",{ replace: true })
            return
        }
        setUser(userData.data as User)
        const friendList = await axios.post(`${serverURLs['prod']}api/user/friends`,user)
        const friendUsernames = friendList.data.map((friend) => friend.username)
        setFriends(friendUsernames)
        setSelectedFriend(friendUsernames[0])
        const subscribeData = { action: "subscribe", topics: [user.username] }
        ws.send(JSON.stringify(subscribeData))
    },[])

    const openChat = (friend) => {
        setSelectedFriend(friend)
    }

    return (
        <>
            <NavBar/>
            <div class="chat-app">
              <div class="sidebar">
                <h2>Friends</h2>
                <ul>
                   {friends().map(friend => (
                    <li>
                      <button class="chat-btn" onclick={() => openChat(friend)}>{friend}</button>
                    </li>
                  ))}
                </ul>
              </div>
             <Chat/>
            </div>
        </>
    );
};

export default App;
