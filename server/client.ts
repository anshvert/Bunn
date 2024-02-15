const socket: WebSocket = new WebSocket('ws://localhost:4010') as WebSocket;

socket.addEventListener('open', async () => {
  console.log('Connected to the server');
  process.stdout.write("Write Something to the Server\n")
  for await (const line of console) {
    socket.send(line)
  }
});

socket.addEventListener('message', (event) => {
  console.log('Message from server', event.data);
});
