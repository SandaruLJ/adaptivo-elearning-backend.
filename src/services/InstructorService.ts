import { Logger } from '../loaders/logger';
import InstructorDao from '../dao/InstructorDao';
import IInstructor from '../interfaces/IInstructor';
import IInstructorService from './interfaces/IInstructorService';

export default class InstructorService implements IInstructorService {
    private logger = Logger.getInstance();
    private instructorDao = InstructorDao.getInstance();
    
    private static instance: InstructorService;

    
    public static getInstance(): InstructorService {
        if (!this.instance) {
            this.instance = new InstructorService();
        }

        return this.instance;
    }

    public async createInstructor(request: IInstructor): Promise<IInstructor> {
        this.logger.info('InstructorService - createInstructor()');

        return this.instructorDao.save(request)
            .then(data => {
                return data;
            });
    }

    public async getAllInstructors(): Promise<IInstructor[]> {
        this.logger.info('InstructorService - getAllInstructors()');

        return this.instructorDao.getAll()
            .then(data => {
                return data;
            });
    }

    public async getInstructorById(id: string): Promise<IInstructor | Object> {
        this.logger.info('InstructorService - getInstructorById()');

        return this.instructorDao.getById(id)
            .then(data => {
                return data;
            });
    }

    public async updateInstructor(id: string, instructor: IInstructor): Promise<IInstructor | Object> {
        this.logger.info('InstructorService - updateInstructor()');

        return this.instructorDao.update(id, instructor)
            .then(data => {
                return data;
            });
    }

    public async deleteInstructor(id: string): Promise<IInstructor | Object> {
        this.logger.info('InstructorService - deleteInstructor()');

        return this.instructorDao.delete(id)
            .then(data => {
                return data;
            });
    }

}
