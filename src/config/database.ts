import mongoose from 'mongoose';
import { MONGODB_URI } from './env';

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to the database...");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to the database:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new Error("Unable to connect to the database.");
    }
};
