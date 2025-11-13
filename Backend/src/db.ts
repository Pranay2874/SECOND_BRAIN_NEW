import mongoose from "mongoose";
import{ model,Schema } from "mongoose";
import { MONGO_URL } from "./config";


mongoose.connect(MONGO_URL)
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});

export const UserModel = model("User", UserSchema);

const contentSchema=new Schema({
    title:{type:String},
    description: { type: String},
    type:{type:String},
    link:{type:String},
    tags: {type:String},
    userId: { type: mongoose.Types.ObjectId,  ref: "User",  required: true }
})
export const contentModel=model("content",contentSchema);