import { Elysia, MaybePromise } from "elysia";

export type controllerMiddleWare = MaybePromise<(app: Elysia<"", {request: {}, store: {}, derive: {}, resolve: {}}, {type: {}, error: {}}, {}, {}, {}, false>)
    => MaybePromise<Elysia<"", {request: {}, store: {}, derive: {}, resolve: {}}, {type: {}, error: {}}, {}, {}, {}, false>>>


//export type elysiaApp = Elysia<"", {request: Prettify<any>, store: Prettify<any>, derive: Prettify<any>, resolve: Prettify<any>}, {type: Prettify<any>, error: Prettify<any>}, Prettify<MergeSchema<{}, any>>, Prettify<{}>, Prettify<Prettify<{"/": {get: {body: ...<..., ...>["body"], params: undefined extends ...[...] ? (... extends ... ? ... : ...) : ...[...], query: ...<..., ...>["query"], headers: ...<..., ...>["headers"], response: unknown extends ...[...] ? (... extends ... ? (...) : ...) : (... extends ... ? ... : ...)}}}> & {}>>
