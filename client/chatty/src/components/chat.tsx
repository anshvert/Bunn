import { Component, createSignal, createEffect } from "solid-js";
import { useSelectedFriend } from "../stores/friendState";
import ws from "../bin/socket";
import "../styles/chatApp.css";

const ChatScreen: Component = () => {
    const [message, setMessage] = createSignal("");
    const [messages, setMessages] = createSignal([]);
    const [selectedFriend, setSelectedFriend] = useSelectedFriend()

    ws.addEventListener('message',({ data }) => {
        console.log(data,"XD")
        setMessages([...messages(),data])
    })

    const sendMessage = () => {
        setMessages([...messages(), message()]);
        const messageData = { action: "message", username: selectedFriend(), message: message() }
        ws.send(JSON.stringify(messageData))
        setMessage("");
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // Scroll to the bottom of the chat window when new messages are added
    createEffect(() => {
        const chatMessages = document.querySelector(".chat-messages");
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    return (
        <>
            <div class="chat-window">
                <div class="chat-messages">
                    {messages().map((msg, index) => (
                        <div class="message" key={index}>{msg}</div>
                    ))}
                </div>
                <div class="chat-input">
                    <input type="text" value={message()} onInput={handleMessageChange} placeholder="Type your message..." />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    );
};

export default ChatScreen;
