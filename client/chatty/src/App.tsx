import type { Component } from 'solid-js';
import { createWS } from '@solid-primitives/websocket';
import { createSignal } from "solid-js";

const App: Component = () => {
    const [message, setMessage] = createSignal('')
    const [receivedMessage, setReceivedMessage] = createSignal('')
    const ws: WebSocket = createWS("ws://localhost:4000");
    ws.addEventListener('open',() => {
        ws.send("hello")
    })
    ws.addEventListener('message',({ data }) => {
        setReceivedMessage(data)
    })
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSendMessage = () => {
        ws.send(message())
    }
    return (
        <>
            <div>
                <input type="text" value={message()} onInput={handleMessageChange}/>
                <button onclick={handleSendMessage}>Send</button>
                <textarea>{receivedMessage()}</textarea>
            </div>
        </>
    );
};

export default App;
