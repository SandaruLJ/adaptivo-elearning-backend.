import IUser from '../../interfaces/IUser.js';

export default interface IUserService {
    createUser(request: IUser): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
    getUserById(id: string): Promise<IUser | Object>;
    updateUser(id: string, user: IUser): Promise<IUser | Object>;
    deleteUser(id: string): Promise<IUser | Object>;
}