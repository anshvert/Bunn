import type { Elysia } from "elysia";
import User, { IUser } from "../../schemas/User";
import '../../database/mongo'

export const userController = (app: Elysia) =>
    app.group('/user', app =>
        app.post('/signUp', async ({ request, body, set }): Promise<void> => {
            const newUser = new User({ username: body.username, email: body.email, password: body.password })
            await newUser.save()
        }).post('/friends', async ({ body }) => {
            const friends = await User.find({ username: { $ne: body.username } }, { _id: 0, username: 1 }, { lean: true })
            console.log(friends)
            return friends
        }).post('/login', async ({ body }) : Promise<boolean> => {
            const checkUserExists = await User.findOne({ username: body.username, password: body.password }, {}, { lean: true })
            return !!checkUserExists
        })
    )