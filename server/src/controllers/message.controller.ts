import { Elysia } from "elysia";
import Message, { IMessage } from "../../schemas/Message"
import MessageRequest, { IMessageRequest } from "../../schemas/MessageRequest";

export const messageController = (app: Elysia) =>
    app.group("/message",app =>
        app.post("/save", async ({ request, body }): Promise<void> => {
            const message = new Message({ sender: body.sender, receiver: body.receiver, message: body.message })
            await message.save()
        }).post("/retrieve", async ({ request, body }): Promise<IMessage> => {
            return Message.find({
                $or: [
                    { sender: body.sender, receiver: body.receiver },
                    { sender: body.receiver, receiver: body.sender }
                ]
            }, {}, { lean: true });
        }).post("/request", async ({ request, body }): Promise<void> => {
            const messageRequest = new MessageRequest({ sender: body.sender, receiver: body.receiver, status: body.status })
            await messageRequest.save()
        }).post("/request/retrieve", async ({ request, body }): Promise<IMessageRequest> => {
            return MessageRequest.find({
                $or: [
                    { sender: body.username },
                    { receiver: body.username }
                ]
            },{},{ lean: true })
        }).post("/request/update", async ({ request, body }) => {
            console.log(body)
            return MessageRequest.updateOne({
                _id: body._id
            }, { status: body.status });
        })
    )
