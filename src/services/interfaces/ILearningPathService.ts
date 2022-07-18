export interface ILearningPathService {
    generateLearningPath(userId: string, target: string): Promise<Object>;
}