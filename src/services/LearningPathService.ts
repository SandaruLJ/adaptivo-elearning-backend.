import { Logger } from '../loaders/logger.js';
import { ILearningPathService } from './interfaces/ILearningPathService.js';
import { getConcepts } from '../recommendation/concept_repo.js';
import { getKnowledge } from '../recommendation/knowledge.js';
import { getLearningResources } from '../recommendation/learning_resources.js';
import { getLearningStyle } from '../recommendation/learning_style.js';
import { spawn } from 'child_process';


export class LearningPathService implements ILearningPathService {
    private logger = Logger.getInstance();
    public static instance: LearningPathService = null;

    public static getInstance(): LearningPathService {
        if (this.instance === null) {
            this.instance = new LearningPathService();
        }
        return this.instance;
    }

    public async generateLearningPath(userId: string, target: string): Promise<Object> {
        return new Promise(async (resolve, reject) => {
            // Get required data
            const data = await this.fetchRequiredData(userId);
            
            // Stringify data
            const concepts = JSON.stringify(data['concepts']);
            const learningResources = JSON.stringify(data['learningResources']);
            const knowledge = JSON.stringify(data['knowledge']);
            const learningStyle = JSON.stringify(data['learningStyle']);
            
            // Run Python script for learning path generation
            const script = spawn('python3', [
                'dist/recommendation/learning_path_generator.py',
                concepts,
                learningResources,
                knowledge,
                learningStyle,
                target
            ]);

            let learningPath = {};

            script.stdout.on('data', (data) => {
                learningPath = JSON.parse(data.toString());
            });

            script.stderr.on('data', (error) => {
                console.log(error.toString());
                reject();
            });

            script.on('close', () => {
                resolve(learningPath);
            });
        });
    }

    private async fetchRequiredData(userId: string): Promise<Object> {
        let data: any = {
            concepts: [],
            learningResources: [],
            knowledge: {},
            learningStyle: {}
        }
        
        data.concepts = await getConcepts();
        data.learningResources = await getLearningResources();
        data.knowledge = await getKnowledge();
        data.learningStyle = await getLearningStyle();

        return data;
    }
}