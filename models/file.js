//Defines File schema/model to store file metadata (filename, URL, size).
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename:{type:String,required:true},
    path:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdAt:{type:Date,default:Date.now},

});

export const File = mongoose.model("File",fileSchema)