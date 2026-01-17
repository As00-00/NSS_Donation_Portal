import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("please define the MONGODB_URI environment variable")
}
let catched = (global as any).mongoose;

if(!catched){
    catched = (global as any).mongoose = {conn:null,promise:null}
}

async function connectDB(){
    if(catched.conn){
        return catched.conn;
    }
    if(!catched.promise){
        const opts = {
            bufferCommands:false,
        };
        catched.promise =  mongoose.connect(MONGODB_URI,opts).then((mongoose)=>{ 
        return mongoose;
    });
    }
    catched.conn = await catched.promise;
    return catched.conn;
    
}

export default connectDB;
