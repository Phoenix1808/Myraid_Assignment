import mongoose, { connect } from "mongoose";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error){
        console.error("DB connection Failed:" , error.message)
        process.exit(1);
    }
}

export default connectDB
