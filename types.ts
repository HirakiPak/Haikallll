
export enum ComponentType {
  Motherboard = 'Motherboard',
  CPU = 'CPU',
  RAM = 'RAM',
  GPU = 'GPU',
  Storage = 'Storage',
  PSU = 'PSU',
  Case = 'Case',
  Cooler = 'Cooler',
}

export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  brand: string;
  imageUrl: string;
  specs: { [key: string]: string };
}

export type Build = {
  [key in ComponentType]?: Component | null;
};

export interface CompatibilityIssue {
  component1: string;
  component2: string;
  issue: string;
}

export interface CompatibilityRecommendation {
    componentToReplace: string;
    recommendation: string;
    reason: string;
}

export interface CompatibilityReport {
  isCompatible: boolean;
  issues: CompatibilityIssue[];
  recommendations: CompatibilityRecommendation[];
  overallAssessment: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface TutorialStep {
  title: string;
  component: ComponentType | 'Start';
  description: string;
  details: string;
}

export type Mode = 'ASSEMBLY' | 'TUTORIAL' | 'QUIZ' | 'AI_ASSISTANT';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
