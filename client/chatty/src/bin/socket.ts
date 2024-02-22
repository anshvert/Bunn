import { createWS } from "@solid-primitives/websocket";

const ws: WebSocket = createWS("wss://buny-be.onrender.com/ws");

ws.addEventListener('open',() => {
    console.log("Socket Connected")
})

export default ws