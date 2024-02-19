import type { Component } from 'solid-js';
import { createSignal, createEffect } from "solid-js";
import axios from 'axios';
import "./styles/home.css"
import Chat from "./components/chat";
import {UserService} from "./stores/userState";

const App: Component = () => {
    const [friends, setFriends] = createSignal([])
    const [selectedFriend, setSelectedFriend] = createSignal("")
    const { user } = UserService

    createEffect(async () => {
        const friendList = await axios.post("http://localhost:4000/api/user/friends")
        const friendUsernames = friendList.data.map((friend) => friend.username)
        setFriends(friendUsernames)
        console.log(user)
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
             <Chat friend={selectedFriend()}/>
            </div>
        </>
    );
};

export default App;
