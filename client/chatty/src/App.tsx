import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import axios from 'axios';
import Chat from "./components/chat";
import { useUserState } from "./stores/userState";
import "./styles/home.css"
import { useSelectedFriend } from "./stores/friendState";
import ws from "./bin/socket";
import { useNavigate } from "@solidjs/router";

const App: Component = () => {
    const [friends, setFriends] = createSignal([])
    const [user,setUser] = useUserState()
    const [selectedFriend, setSelectedFriend] = useSelectedFriend()
    const navigate = useNavigate()

    createEffect(async () => {
        const userInf = localStorage.getItem("BNY:User")
        if (!userInf) {
            navigate("/onboard",{ replace: true })
            return
        }
        setUser(JSON.parse(userInf))
        const friendList = await axios.post("http://localhost:4000/api/user/friends",user)
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
