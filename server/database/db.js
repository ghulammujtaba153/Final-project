import mongoose from "mongoose";

export async function connection() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected!")
        
    } catch (error) {
        console.log(error)
    }
}