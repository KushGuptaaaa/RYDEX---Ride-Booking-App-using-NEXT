import mongoose, { Document, Mongoose } from "mongoose";


export interface IUser extends Document{
name:string;
email:string;
password?:string; // ? for it can be there or not as loggin in with google or facebook will not have password

role:"user" | "partner" | "admin"
createdAt:Date;
updatedAt:Date;
}

const userSchema=new mongoose.Schema<IUser>({
name:{
    type:String,
    required:true
},
email:{
   type:String,
    required:true,
    unique:true 
},
password:{
    type:String,
},
 
role:{
    type:String,
    default:"user",
    enum:["user","partner","admin"]
}
},{timestamps:true})

userSchema.index({location:"2dsphere"})

const User=mongoose.models.User || mongoose.model("User",userSchema)

export default User;