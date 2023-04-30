import mongoose from "mongoose";

export const connectMongoDB = async () => {

    // const options = {}
    // 'mongodb://username:password@host:port/database?options...'
    // const MONGO_URI_SAMPLE = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?${options}`

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:  true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}`);
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}
