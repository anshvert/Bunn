import { Component } from "solid-js";
import "../styles/chatApp.css"

const chatScreen: Component = () => {

    const sendMessage = async () => {}

    return (
        <>
            <div class="chat-window">
                <h2>Chat</h2>
                <div class="chat-messages">
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..."/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default chatScreen