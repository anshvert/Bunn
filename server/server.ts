

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
            console.log(messageData)
        if (messageData.action === "subscribe") {
            messageData.topics.forEach((topic) => {
                console.log("while subs",topic)
                ws.subscribe(topic)
            })
        } else {
            console.log("While pubs",messageData.username)
            ws.publish(messageData.username,messageData.message)
        }
      },
        open(ws) {
            console.log('Client connected');
      },
    },
    port: 4500,
});