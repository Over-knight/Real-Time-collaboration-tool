import { Schema, model, Document } from "mongoose";

interface IRoom extends Document {
    _id: string;
    roomId: string;
    email: string;
    createdAt: Date;
}

const inviteSchema = new Schema<IRoom>({
    _id: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Invite = model<IRoom>("Invite", inviteSchema);

