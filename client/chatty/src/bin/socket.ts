import { createWS } from "@solid-primitives/websocket";
import { wSocketUrls } from "../config";

const ws: WebSocket = createWS(`${wSocketUrls['dev']}`);

ws.addEventListener('open',() => {
    console.log("Socket Connected")
})

export default ws