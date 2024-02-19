import { createWS } from "@solid-primitives/websocket";

const ws: WebSocket = createWS("ws://localhost:4500");

export default ws