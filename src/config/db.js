import mongoose from "mongoose";

// ------------- MongoDB Connection -------------
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("Connection to MongoDB successfully");
    } catch (error) {
        console.error("Connection to MongoDB failed", error.message);
        process.exit(1);
    }
};

export default connectMongoDB;