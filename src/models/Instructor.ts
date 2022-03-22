import IInstructor from '../interfaces/IInstructor';
import * as mongoose from 'mongoose';


const InstructorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    subjects: [{
        type: String,
        required: false,
        trim: true
    }]
});

export default mongoose.model<IInstructor & mongoose.Document>('instructors', InstructorSchema);
