import { Schema, model, Document, Types } from 'mongoose';

export interface ILocation extends Document {
    name: string;
    latitude: number;
    longitude: number;
}

const LocationSchema = new Schema<ILocation>({
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

export const Location = model<ILocation>('Location', LocationSchema);
