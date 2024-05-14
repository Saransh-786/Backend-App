import mongoose from "mongoose"

import {DB_NAME} from "../constants.js";

const connectDB =async()=>{
    try{
        const connectionInatance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectionInatance.connection.host}`);
        setTimeout(() => {
            process.exit(0);
        }, 100); 
    }
    catch(error){
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

export default connectDB