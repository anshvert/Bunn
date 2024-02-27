import { model, Schema } from "mongoose";

export interface IMessage extends Document {
    sender: Schema.Types.ObjectId,
    receiver: Schema.Types.ObjectId,
    message: String,
}

const schema = new Schema<IMessage>(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

export default model('message',schema)