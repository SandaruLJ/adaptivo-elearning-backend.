export default interface IUser {
    _id?: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dob: string;
    devices: string[];
    preferredLanguage: string;
    isSchoolStudent: boolean;
    grade: number;
    school: string;
}