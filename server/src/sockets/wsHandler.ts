import { ServerWebSocket, WebSocketHandler } from "bun";
import { Context } from "elysia";

export const webSocketHandler: Partial<WebSocketHandler<Context>> = {
    message(ws: ServerWebSocket<Context>, message: string): void {
        if (message.action === "subscribe") {
            message.topics.forEach((topic) => {
                ws.subscribe(topic)
            })
        } else {
            ws.publish(message.receiver, JSON.stringify(message))
        }
    }
}