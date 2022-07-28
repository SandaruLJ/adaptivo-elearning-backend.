export interface ILearningStyle {
  _id?: string;
  userId: string;
  input: Object;
  processing: Object;
  understanding: Object;
  perception: Object;
  isOnboardingTourCompleted: boolean;
  isDetectedByAlgorithm: boolean;
  detectedLearningStyle: Object;
}
