import { Elysia } from "elysia";
import User from "../../schemas/User";
import Message, { IMessage } from "../../schemas/Message"

interface SearchRequestBody {
    searchQuery: string
}

export const searchController = (app: Elysia) =>
    app.group('/search',app =>
        app.post('/', async ({ request, body }: { request: any, body: SearchRequestBody }) => {
            const searchRegex: RegExp = new RegExp(`^${body.searchQuery}`,'i')
            try {
                const [userData, messageData] = await Promise.all([
                    User.find({ username: { $regex: searchRegex }},{ _id: 0, username: 1 },{ lean: true }),
                    Message.find({ message: { $regex: searchRegex }}, { _id: 0 }, { lean: true })
                ])
                return {
                    userData: userData,
                    messageData: messageData
                }
            } catch (err) {
                console.error(err)
            }
        })
    )