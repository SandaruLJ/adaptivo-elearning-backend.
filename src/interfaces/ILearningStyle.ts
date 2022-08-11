export interface ILearningStyle {
  _id?: string;
  userId: Object;
  input: Object;
  processing: Object;
  understanding: Object;
  perception: Object;
  isOnboardingTourCompleted: boolean;
  isDetectedByAlgorithm: boolean;
  detectedLearningStyle: Object;
  initialLearningStyle: Object;
  history: [any];
}
