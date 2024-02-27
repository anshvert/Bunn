import { Component, createSignal, createEffect } from "solid-js";
import { useSelectedFriend } from "../stores/friendState";
import ws from "../bin/socket";
import { useUserState } from "../stores/userState";
import "../styles/chatApp.css";
import axios from "axios";
import { serverURLs } from "../config";

const ChatScreen: Component = () => {
    const [message, setMessage] = createSignal("");
    const [conversations, setConversations] = createSignal({});
    const [selectedFriend] = useSelectedFriend()
    const [user] = useUserState()

    ws.addEventListener('message',({ data }) => {
        const messageData = JSON.parse(data)
        setConversations(prevConversations => ({
            ...prevConversations,
            [messageData.sender]: [...prevConversations[messageData.sender] || [], messageData]
        }))
    })

    const sendMessage = async () => {
        const messageData = { action: "message", receiver: selectedFriend(), sender: user.username, message: message() }
        setConversations(prevConversations => ({...prevConversations,[selectedFriend()]: [...prevConversations[selectedFriend()] || [], messageData]}));
        ws.send(JSON.stringify(messageData))
        await axios.post(`${serverURLs['dev']}api/message/save`,messageData)
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

    createEffect(async () => {
        const messageQuery = { sender: user.username, receiver: selectedFriend() }
        const messageData  = await axios.post(`${serverURLs['dev']}api/message/retrieve`, messageQuery)
        setConversations(prevConversations => ({...prevConversations,[messageQuery.receiver]: messageData.data }))
    })

    return (
        <>
            <div class="chat-window">
                <h2>Chat with {selectedFriend()}</h2>
                <div class="chat-messages">
                    {Object.entries(conversations()).map(([friend, messages], index) => (
                        friend === selectedFriend() ? (
                            <div key={index} class="chat-messages">
                                {messages.map((msg, index) => (
                                    <div class={`message ${msg.sender === selectedFriend() ? "received" : "sent"}`}
                                         key={index}>{msg.message}
                                    </div>
                                ))}
                            </div>
                        ) : null
                    ))}
                </div>
                <div class="chat-input">
                    <input type="text" value={message()} onInput={handleMessageChange}
                           placeholder="Type your message..."/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    );
};

export default ChatScreen;
