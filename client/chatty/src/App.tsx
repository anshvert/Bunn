import type { Component } from 'solid-js';
import Chat from "./components/chat";
import NavBar from "./components/navBar";
import FriendColumns from "./components/FriendColumns";
import "./styles/app.css"

const App: Component = () => {
    return (
        <>
            <NavBar/>
            <div class="chat-app">
              <div class="sidebar">
                <FriendColumns/>
              </div>
             <Chat/>
            </div>
        </>
    );
};

export default App;
