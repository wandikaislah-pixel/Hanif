export interface ComicPanelData {
  id: string;
  order: number;
  characterName: string;
  characterAvatar: 'kiki' | 'piko' | 'bimo' | 'chef';
  dialogue: string;
  narrative?: string;
  illustrationType: 'pizza-slice' | 'chocolate-bar' | 'balance-scale' | 'juice-cup' | 'mixed-bread' | 'comic-scene';
  imageSrc?: string;
  visualProps?: Record<string, any>;
  tipBubble?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  contextImage?: string;
  fractionDisplay?: { numerator: number; denominator: number };
  options: {
    id: string;
    text: string;
    fraction?: { numerator: number; denominator: number };
    isCorrect: boolean;
  }[];
  explanation: string;
  visualHint?: string;
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  storyDescription: string;
  themeColor: string;
  badgeId: string;
  coverImage?: string;
  panels: ComicPanelData[];
  interactiveExplainer: {
    title: string;
    description: string;
    type: 'pizza' | 'chocolate' | 'balance' | 'juice';
  };
  quiz: QuizQuestion[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requiredChapterId?: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface QuizAttempt {
  chapterId: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface StudentProfile {
  name: string;
  avatar: 'rabbit' | 'owl' | 'bear' | 'cat';
  grade: string;
}

export interface UserProgress {
  profile: StudentProfile;
  completedChapters: number[];
  currentChapterId: number;
  quizAttempts: Record<number, QuizAttempt[]>; // chapterId -> attempts
  unlockedBadgeIds: string[];
  sandboxExploredCount: number;
  soundEnabled: boolean;
  bgmEnabled?: boolean;
  bgmVolume?: number;
}
