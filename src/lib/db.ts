
import mongoose from "mongoose"


// ye do line dns wale mongo db se nhi ho rhi thi connect uske liye hua tha 
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongodbUrl=process.env.MONGODB_URL

if(!mongodbUrl){
    throw new Error("db url not found!")
}

let cached=global.mongooseConn
if(!cached){
    cached=global.mongooseConn={conn:null,promise:null}
}

const connectDb=async () => {
    if(cached.conn){
        return cached.conn
    }


    if(!cached.promise){
        cached.promise=mongoose.connect(mongodbUrl).then(c=>c.connection)
    }

try {
    const conn=await cached.promise
  
    return conn
} catch (error) {
    console.log(error)
    cached.promise = null
    throw error

}

}

export default connectDb