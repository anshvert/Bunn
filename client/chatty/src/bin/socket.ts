import { createWS } from "@solid-primitives/websocket";

const ws: WebSocket = createWS("ws://localhost:4500");

ws.addEventListener('open',() => {
    console.log("Socket Connected")
})

export default ws