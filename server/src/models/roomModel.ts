import { Schema, model, Document } from "mongoose";

interface IRoom extends Document {
    _id: string;
    ownerId: string;
    inviteLink: string;
    crateAt: Date;
}

const roomSchema = new Schema<IRoom>({
    _id: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    inviteLink: {
        type: String,
        required: true,
    },
    crateAt: {
        type: Date,
        default: Date.now,
    },
});

export const Room = model<IRoom>("Room", roomSchema);