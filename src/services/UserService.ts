import { Logger } from '../loaders/logger';
import UserDao from '../dao/UserDao';
import IUser from '../interfaces/IUser';
import IUserService from './interfaces/IUserService';

export default class UserService implements IUserService {
    private logger = Logger.getInstance();
    private userDao = UserDao.getInstance();
    
    private static instance: UserService;

    
    public static getInstance(): UserService {
        if (!this.instance) {
            this.instance = new UserService();
        }

        return this.instance;
    }

    public async createUser(request: IUser): Promise<IUser> {
        this.logger.info('UserService - createUser()');

        return this.userDao.save(request)
            .then(data => {
                return data;
            });
    }

    public async getAllUsers(): Promise<IUser[]> {
        this.logger.info('UserService - getAllUsers()');

        return this.userDao.getAll()
            .then(data => {
                return data;
            });
    }

    public async getUserById(id: string): Promise<IUser | Object> {
        this.logger.info('UserService - getUserById()');

        return this.userDao.getById(id)
            .then(data => {
                return data;
            });
    }

    public async updateUser(id: string, user: IUser): Promise<IUser | Object> {
        this.logger.info('UserService - updateUser()');

        return this.userDao.update(id, user)
            .then(data => {
                return data;
            });
    }

    public async deleteUser(id: string): Promise<IUser | Object> {
        this.logger.info('UserService - deleteUser()');

        return this.userDao.delete(id)
            .then(data => {
                return data;
            });
    }

}
