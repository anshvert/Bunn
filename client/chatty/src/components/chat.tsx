import { Component, createSignal, createEffect } from "solid-js";
import "../styles/chatApp.css";
import ws from "../bin/socket";

const ChatScreen: Component = () => {
    const [message, setMessage] = createSignal("");
    const [messages, setMessages] = createSignal([]);

    ws.addEventListener('open',() => {
        const subscribeData = { action: "subscribe", topic: "" }
        ws.send({})
    })
    ws.addEventListener('message',({ data }) => {
        console.log(data)
    })

    // const handleMessageChange = (e) => {
    //     setMessage(e.target.value)
    // }
    // const handleSendMessage = () => {
    //     ws.send(message())
    // }

    const sendMessage = () => {
        setMessages([...messages(), message()]);
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
