import autoBind from 'auto-bind';
import { Logger } from '../loaders/logger.js';
import { ILearningPathService } from '../services/interfaces/ILearningPathService.js';
import { LearningPathService } from '../services/LearningPathService.js';


export default class LearningPathController {
    private logger: Logger;
    private learningPathService: ILearningPathService;

    constructor() {
        this.logger = Logger.getInstance();
        this.learningPathService = LearningPathService.getInstance();
        autoBind(this)
    }

    public async generateLearningPath(req: any, res: any): Promise<void> {
        this.logger.info('LearningPathController - generateLearningPath()');

        const userId = req.params.userId;
        const target = req.params.target;

        await this.learningPathService.generateLearningPath(userId, target)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
    }

    public async generateRecommendations(req: any, res: any): Promise<void> {
        this.logger.info('LearningPathController - generateRecommendations()');

        const userId = req.params.userId;

        if (req.body && req.body.concepts) {
            const targetConcepts = req.body.concepts;

            await this.learningPathService.getRecommendations(userId, targetConcepts)
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((error) => {
                    this.logger.error(error);
                    res.status(500).send({ err: error });
                });
        } else {
            this.logger.error('No request body.');
            res.status(400).send({ err: 'No request body' });
        }
    }
}