import type { Elysia } from "elysia";

export const userController = (app: Elysia) =>
    app.group('/user', app =>
        app.post('/signUp', async ({ request }): Promise<void> => {
        console.log(request)
    }))
