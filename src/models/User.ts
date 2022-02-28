import IUser from '../interfaces/IUser';
import * as mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
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
    devices: [{
        type: String,
        required: true,
        trim: true
    }],
    preferredLanguage: {
        type: String,
        enum: ['en', 'si', 'ta'],
        required: true,
        default: 'en'
    },
    isSchoolStudent: {
        type: Boolean,
        required: true
    },
    grade: {
        type: Number,
    },
    school: {
        type: String,
        trim: true
    }
});

export default mongoose.model<IUser & mongoose.Document>('users', UserSchema);
