import { model, Schema } from "mongoose";

export interface IMessageRequest extends Document {
    sender: string,
    receiver: string,
    status: string,
    message: string
}

const schema = new Schema<IMessageRequest>(
    {
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending","accepted","rejected"],
            default: "pending",
            required: true
        },
        message: {
            type: String
        }
    }, {
        timestamps: true
    }
)

export default model('messageRequest',schema)