import type { Component } from 'solid-js';
import { createWS } from '@solid-primitives/websocket';
import { createSignal } from "solid-js";
import Login from "./components/login";
import Signup from "./components/signup";

const App: Component = () => {
    const [message, setMessage] = createSignal('')
    const [receivedMessage, setReceivedMessage] = createSignal('')
    const ws: WebSocket = createWS("ws://localhost:3000");
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
            <Login/>
            <Signup/>
        </>
    );
};

export default App;
