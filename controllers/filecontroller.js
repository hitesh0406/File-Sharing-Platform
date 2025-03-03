// for managing file uploads and delete operations 
import multer from "multer"
import {File} from "../models/file.js"

const uploads = multer({dest:"uploads/"})
export const uploadFile = async(req,res)=>{
    const {filename,path} = req.file;
    const file = new File({filename,path,user:req.userId});
    await file.save()
    res.json({message:'File uploaded',file});
}

export const downloadFile = async(req,res)=>{
    const file = await File.findOne({_id:req.params.id,user:req.userId})
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.download(file.path, file.filename);
}