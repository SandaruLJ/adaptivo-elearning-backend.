import {IConcept} from "../interfaces/IConcept";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const conceptSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        lessonId:{type:Schema.Types.ObjectId,required:true,ref:'lessons'},
        courseId:{type:Schema.Types.ObjectId,required:true,ref:'courses'},
    }

);
export default mongoose.model<IConcept & mongoose.Document>('concepts',conceptSchema)