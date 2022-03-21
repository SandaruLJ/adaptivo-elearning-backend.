import {ICategory} from "../interfaces/ICategory";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },

        image:{
            type:String,
            required:true,
        },
        course:[{
            type:String,
            required:false,
            trim:true
        }]

    }



);
export default mongoose.model<ICategory & mongoose.Document>('categories',CategorySchema)
