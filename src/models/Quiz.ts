import {IQuiz} from "../interfaces/IQuiz";
import * as mongoose from "mongoose";
import { truncate } from "fs";
const Schema = mongoose.Schema;
const QuizSchema = new Schema(
    {
        quizId: {
            type: Number,
            required: true,
        },
        quiz: {
            type: String,
            required: true,
            trim: true
        },
        answers:{
            type:String,
            required:true,
            trim:true
        },
        correctAnswer:{
            type:String,
            required:true,
            trim:true,
        },
        LO_id:{
            type:Number,
            required:true
        }
    }
    , { timestamps: true });

export default mongoose.model<IQuiz & mongoose.Document>('quiz',QuizSchema)