import { ICategory } from "../interfaces/ICategory.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
<<<<<<< HEAD
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


=======
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
>>>>>>> 9158fc9be409e8464d163f7dd52c98bfc2ea4d35

    image: {
      type: String,
      required: true,
    },
    course: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model<ICategory & mongoose.Document>("categories", CategorySchema);
