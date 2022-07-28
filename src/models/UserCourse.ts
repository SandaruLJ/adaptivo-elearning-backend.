import { IUserCourse } from "../interfaces/IUserCourse.js";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;
const UserCourseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "users",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "courses",
      //   autopopulate: true,
    },
    learningPath: [
      {
        name: {
          type: String,
          required: false,
          trim: true,
        },
        units: [
          {
            name: {
              type: String,
              required: false,
              trim: true,
            },
            isConceptLink: {
              type: Boolean,
              required: false,
              trim: true,
            },
            type: {
              type: String,
              required: false,
              trim: true,
            },
            note: {
              type: String,
              required: false,
              trim: true,
            },
            isCompleted: {
              type: Boolean,
              required: false,
              trim: true,
            },
            duration: {
              type: String,
              required: false,
              trim: true,
            },
            video: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "LearningResources",
              autopopulate: true,
            },
            audio: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "LearningResources",
              autopopulate: true,
            },
            loId: {
              type: Schema.Types.ObjectId,
              required: false,
              ref: "LearningObjects",
              autopopulate: true,
            },
            quiz: [
              {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "quiz",
                autopopulate: true,
              },
            ],
          },
        ],
      },
    ],
    progress: {
      type: Number,
      required: true,
      trim: true,
      default: 0,
    },
  },
  { timestamps: true }
);
UserCourseSchema.plugin(mongooseAutoPopulate);
export default mongoose.model<IUserCourse & mongoose.Document>("userCourses", UserCourseSchema);
