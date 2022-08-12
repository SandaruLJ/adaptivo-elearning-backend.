export interface ILearningPathService {
    generateLearningPath(userId: string, target: string): Promise<Object>;
    getRecommendations(userId: string, targetConcepts: any[]): Promise<Object>;
}