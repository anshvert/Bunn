import type { Elysia } from "elysia";
import User, { IUser } from "../../schemas/User";
import '../../database/mongo'

export const userController = (app: Elysia) =>
    app.group('/user', app =>
        app.post('/signUp', async ({ request, body, set }): Promise<void> => {
            console.log(request,body)
            const newUser = new User({ username: body.username, email: body.email, password: body.password })
            await newUser.save()
        }).get('/friends', async ({ request }) => {
            console.log(request)
            const friends = await User.find({}, { _id: 0, username: 1 }, { lean: true })
            console.log(friends)
            return friends
        })
    )
