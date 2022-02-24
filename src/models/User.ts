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
    }
});

export default mongoose.model<IUser & mongoose.Document>('users', UserSchema);
