import {ICourse} from "../interfaces/ICourse";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const CourseSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        subTitle:{
            type:String,
            required:false,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        language:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            trim:true
        },
        currency:{
            type:String,
            required:true,
            trim:true
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        image:{
            type:String,
            required:true,
        },
        level:{
            type:String,
            required:true,
            trim:true
        },
        // curriculum:{type:Schema.Types.ObjectId,required:true,ref:'curriculum'},
        learningOutcomes:[{
            type:String,
            required:false,
            trim:true
        }],
        preRequisites:[{
            type:String,
            required:false,
            trim:true
        }]

    }



);
export default mongoose.model<ICourse & mongoose.Document>('courses',CourseSchema)