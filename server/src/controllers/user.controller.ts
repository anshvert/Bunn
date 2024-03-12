import type { Elysia } from "elysia";
import User from "../../schemas/User";
import '../../database/mongo'
import MessageRequest from "../../schemas/MessageRequest";

export const userController = (app: Elysia) =>
    app.group('/user', app =>
        app.post('/signUp', async ({ request, body, set }): Promise<void> => {
            const newUser = new User({ username: body.username, email: body.email, password: body.password })
            await newUser.save()
        }).post('/friends', async ({ body }) => {
            return MessageRequest.find(
                {
                    $or: [
                        { sender: body.username },
                        { receiver: body.username }
                    ],
                    status: "accepted"
                },{ _id: 0, status: 0 },
                { lean: true })
        }).post('/login', async ({ body }) : Promise<boolean> => {
            const checkUserExists = await User.findOne(
                { username: body.username, password: body.password },
                {},
                { lean: true })
            return !!checkUserExists
        })
    )
