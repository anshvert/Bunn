import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { userController } from "./controllers/user.controller";
import { cors } from '@elysiajs/cors'
import { controllerMiddleWare } from "../types/types";

const PORT = process.env.PORT || 4000

const app = new Elysia()
    .use(swagger({
        path: "/v1/swagger",
        documentation: {
            info: {
                title: 'BunJS & ElysiaJS',
                version: '1.0.0',
          },
        }}))
    .use(cors())
    .get("/", () => "Hello Elysia")
    .group('/api',(app: Elysia<"/api">) =>
        app.use(userController))
    .listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
