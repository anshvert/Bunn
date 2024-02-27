import { Elysia } from "elysia";
import Message, { IMessage } from "../../schemas/Message"

export const messageController = (app: Elysia) =>
    app.group("/message",app =>
        app.post("/save", async ({ request, body }): Promise<void> => {
            console.log("Save the message",body)
            const message = new Message({ sender: body.sender, receiver: body.receiver, message: body.message })
            await message.save()
        }).post("/retrieve", async ({ request, body }): Promise<IMessage> => {
            return Message.find({
                $or: [
                    { sender: body.sender, receiver: body.receiver },
                    { sender: body.receiver, receiver: body.sender }
                ]
            }, {}, { lean: true });
        })
    )
