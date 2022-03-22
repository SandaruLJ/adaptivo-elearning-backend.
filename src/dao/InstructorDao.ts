import { Logger } from '../loaders/logger';
import IInstructor from '../interfaces/IInstructor';
import Instructor from '../models/Instructor';
import InstructorNotFoundError from '../errors/InstructorNotFoundError';


export default class InstructorDao {
    private logger = Logger.getInstance();

    public static instance: InstructorDao = null;

    public static getInstance(): InstructorDao {
        if (this.instance == null) {
            this.instance = new InstructorDao();
        }

        return this.instance;
    }

    public async save(request: IInstructor) {
        this.logger.info('InstructorDao - save()');
        const instructor = new Instructor(request);

        return await instructor.save()
            .then(data => {
                this.logger.info(`Instructor "${data.firstname} ${data.lastname}" inserted successfully.`);
                return data;
            });
    }

    public async getAll() {
        this.logger.info('InstructorDao - getAll()');

        return await Instructor.find({})
            .then(data => {
                if (data.length > 0) {
                    this.logger.info('Instructors retrieved successfully.');
                } else {
                    this.logger.error('Instructors not found.');
                }

                return data;
            });
    }

    public async getById(id: string) {
        this.logger.info('InstructorDao - getById()');

        return await Instructor.findById(id)
            .then(data => {
                if (data) {
                    this.logger.info(`Instructor "${data.firstname} ${data.lastname}" retrieved successfully.`);
                    return data;
                } else {
                    throw new InstructorNotFoundError(`Instructor '${id}' not found`);
                }
            });
    }

    public async update(id: string, instructor: IInstructor) {
        this.logger.info('InstructorDao - update()');

        return await Instructor.findByIdAndUpdate(id, instructor, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`Instructor "${data.firstname} ${data.lastname}" updated successfully`);
                    return data;
                } else {
                    throw new InstructorNotFoundError(`Instructor '${id}' not found`);
                }
            });
    }

    public async delete(id: string) {
        this.logger.info('InstructorDao - delete()');

        return await Instructor.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`Instructor "${data.firstname} ${data.lastname}" deleted successfully.`);
                    return data;
                } else {
                    throw new InstructorNotFoundError(`Instructor '${id}' not found`);
                }
            });
    }
}
