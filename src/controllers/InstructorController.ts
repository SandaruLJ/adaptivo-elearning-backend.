import { Logger } from '../loaders/logger.js';
import IInstructor from '../interfaces/IInstructor.js';
import IInstructorService from '../services/interfaces/IInstructorService.js';
import InstructorService from '../services/InstructorService.js';
import autoBind from 'auto-bind';
import UserNotFoundError from '../errors/UserNotFoundError.js';

export default class InstructorController {
    private logger: Logger;
    private instructorService: IInstructorService;

    constructor() {
        this.logger = Logger.getInstance();
        this.instructorService = InstructorService.getInstance();
        autoBind(this);
    }

    public async createInstructor(req: any, res: any): Promise<void> {
        this.logger.info('InstructorController - createInstructor()');

        if (req.body) {
            const instructor: IInstructor = req.body;
            await this.instructorService.createInstructor(instructor)
                .then(data => {
                    res.status(201).send(data);
                })
                .catch(error => {
                    this.logger.error(`Error occurred while inserting instructor: ${error}`);
                    res.status(500).send({ err: error.message });
                });
        } else {
            this.logger.error('No request body.');
            res.status(400).send({ err: 'No request body' });
        }
    }

    public async getAllInstructors(req: any, res: any): Promise<void> {
        this.logger.info('InstructorController - getAllInstructors()');

        await this.instructorService.getAllInstructors()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(`Error occurred while retrieving instructors: ${error}`);
                res.status(500).send({ err: error.message });
            });
    }

    public async getInstructorById(req: any, res:any) {
        this.logger.info('InstructorController - getInstructorById()');

        const id = req.params.id;

        await this.instructorService.getInstructorById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(`Error occurred while retrieving instructor '${id}': ${error}`);

                if (error instanceof UserNotFoundError) {
                    res.status(error.status).send({ err: error.message });
                } else {
                    res.status(500).send({ err: error.message });
                }
            });
    }

    public async updateInstructor(req: any, res: any) {
        this.logger.info('InstructorController - updateInstructor()');

        const id = req.params.id;

        if (req.body) {
            const instructor: IInstructor = req.body;

            await this.instructorService.updateInstructor(id, instructor)
                .then(() => {
                    res.status(204).send();
                })
                .catch(error => {
                    this.logger.error(`Error occurred while updating instructor '${id}': ${error}`);

                    if (error instanceof UserNotFoundError) {
                        res.status(error.status).send({ err: error.message });
                    } else {
                        res.status(500).send({ err: error.message });
                    }
                });
        } else {
            this.logger.error('No request body.');
            res.status(400).send({ err: 'No request body' });
        }
    }

    public async deleteInstructor(req: any, res: any) {
        this.logger.info('InstructorController - deleteInstructor()');

        const id = req.params.id;

        await this.instructorService.deleteInstructor(id)
            .then(() => {
                res.status(204).send();
            })
            .catch(error => {
                this.logger.error(`Error occurred while deleting instructor '${id}': ${error}`);

                if (error instanceof UserNotFoundError) {
                    res.status(error.status).send({ err: error.message });
                } else {
                    res.status(500).send({ err: error.message });
                }
            });
    }

}
