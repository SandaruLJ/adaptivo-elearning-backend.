import { Logger } from '../loaders/logger';
import IUser from '../interfaces/IUser';
import User from '../models/User';


export default class UserDao {
    private logger = Logger.getInstance();

    public static instance: UserDao = null;

    public static getInstance(): UserDao {
        if (this.instance == null) {
            this.instance = new UserDao();
        }

        return this.instance;
    }

    public async save(request: IUser) {
        this.logger.info('UserDao - save()');
        const user = new User(request);

        return await user.save()
            .then(data => {
                this.logger.info(`User "${data.firstname} ${data.lastname}" inserted successfully.`);
                return data;
            })
            .catch(error => {
                this.logger.error(`Error occurred while inserting user: ${error.message}`);
                throw error;
            });
    }

    public async getAll() {
        this.logger.info('UserDao - getAll()');

        return await User.find({})
            .then(data => {
                if (data.length > 0) {
                    this.logger.info('Users retrieved successfully.');
                } else {
                    this.logger.error('Users not found.');
                }

                return data;
            })
            .catch(error => {
                this.logger.error(`Error occurred while retrieving users: ${error.message}`);
                throw error;
            });
    }

    public async getById(id: string) {
        this.logger.info('UserDao - getById()');

        return await User.findById(id)
            .then(data => {
                if (data) {
                    this.logger.info(`User "${data.firstname} ${data.lastname}" retrieved successfully.`);
                    return data;
                } else {
                    this.logger.info(`User "${id}" not found.`);
                    return { msg: 'User not found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error occurred while retrieving user "${id}": ${error.message}`);
                throw error;
            });
    }

    public async update(id: string, user: IUser) {
        this.logger.info('UserDao - update()');

        return await User.findByIdAndUpdate(id, {$set: user}, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`User "${data.firstname} ${data.lastname}" updated successfully`);
                    return data;
                } else {
                    this.logger.info(`User "${id}" not found.`);
                    return { msg: 'User not found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error occurred while updating user "${id}": ${error.message}`);
                throw error;
            });
    }

    public async delete(id: string) {
        this.logger.info('UserDao - delete()');

        return await User.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`User "${data.firstname} ${data.lastname}" deleted successfully.`);
                    return data;
                } else {
                    this.logger.info(`User "${id}" not found.`);
                    return { msg: 'User not found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error occurred while deleting user "${id}": ${error.message}`);
                throw error;
            });
    }
}
