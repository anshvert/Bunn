const chatMap = {"ansh": "Bunny", "Bunny":"Ansh"}

Bun.serve({
    fetch(req, server) {
        if (server.upgrade(req)) {
        return;
      }
        return new Response('Upgrade failed :(', { status: 500 });
    },
    websocket: {
        message(ws, message: string) {
        const messageData = JSON.parse(message)
        if (messageData.action === "subscribe") {
            ws.subscribe(messageData.topic)
        } else {
            ws.publish(chatMap[messageData.username],messageData.message)
        }
      },
        open(ws) {
        console.log('Client connected');
      },
    },
    port: 4500,
});