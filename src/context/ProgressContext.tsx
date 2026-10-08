import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Badge, QuizAttempt, StudentProfile, UserProgress } from '../types';
import { INITIAL_BADGES } from '../data/badgesData';
import { playSound, bgm } from '../utils/sound';

const STORAGE_KEY = 'pecahan_sd_progress_v1';

interface ProgressContextType {
  progress: UserProgress;
  badges: Badge[];
  activeBadgeCelebration: Badge | null;
  isBgmPlaying: boolean;
  bgmVolume: number;
  toggleBgm: () => void;
  setBgmVolume: (vol: number) => void;
  closeBadgeCelebration: () => void;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  setCurrentChapter: (chapterId: number) => void;
  markChapterCompleted: (chapterId: number) => void;
  saveQuizResult: (attempt: QuizAttempt) => void;
  incrementSandboxAction: () => void;
  toggleSound: () => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  profile: {
    name: 'Petualang Cilik',
    avatar: 'rabbit',
    grade: 'Kelas 3 & 4 SD',
  },
  completedChapters: [],
  currentChapterId: 1,
  quizAttempts: {},
  unlockedBadgeIds: [],
  sandboxExploredCount: 0,
  soundEnabled: true,
  bgmEnabled: false,
  bgmVolume: 0.25,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultProgress, ...parsed };
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return defaultProgress;
  });

  const [activeBadgeCelebration, setActiveBadgeCelebration] = useState<Badge | null>(null);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [bgmVolume, setBgmVolumeState] = useState<number>(progress.bgmVolume ?? 0.25);

  const toggleBgm = () => {
    if (isBgmPlaying) {
      bgm.stop();
      setIsBgmPlaying(false);
      setProgress(prev => ({ ...prev, bgmEnabled: false }));
    } else {
      bgm.setVolume(bgmVolume);
      bgm.start();
      setIsBgmPlaying(true);
      setProgress(prev => ({ ...prev, bgmEnabled: true }));
    }
  };

  const setBgmVolume = (val: number) => {
    setBgmVolumeState(val);
    bgm.setVolume(val);
    setProgress(prev => ({ ...prev, bgmVolume: val }));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress]);

  const unlockBadge = (badgeId: string) => {
    if (progress.unlockedBadgeIds.includes(badgeId)) return;

    const badgeObj = INITIAL_BADGES.find(b => b.id === badgeId);
    if (!badgeObj) return;

    setProgress(prev => {
      if (prev.unlockedBadgeIds.includes(badgeId)) return prev;
      return {
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId],
      };
    });

    playSound.badgeUnlock(progress.soundEnabled);
    setActiveBadgeCelebration({ ...badgeObj, isUnlocked: true, unlockedAt: new Date().toLocaleDateString('id-ID') });
  };

  const checkAutoBadges = (updatedCompletedChapters: number[], attemptsRecord: Record<number, QuizAttempt[]>, sandboxCount: number) => {
    // Bab 1-5 badges
    [1, 2, 3, 4, 5].forEach(chId => {
      if (updatedCompletedChapters.includes(chId)) {
        unlockBadge(`badge_bab${chId}`);
      }
    });

    // Check perfect 100 score
    const hasPerfectScore = Object.values(attemptsRecord).some(attempts =>
      attempts.some(a => a.percentage === 100)
    );
    if (hasPerfectScore) {
      unlockBadge('badge_perfect');
    }

    // Check sandbox
    if (sandboxCount >= 5) {
      unlockBadge('badge_lab');
    }

    // Check master (all 5 chapters)
    if ([1, 2, 3, 4, 5].every(ch => updatedCompletedChapters.includes(ch))) {
      unlockBadge('badge_master');
    }
  };

  const updateProfile = (newProfile: Partial<StudentProfile>) => {
    setProgress(prev => ({
      ...prev,
      profile: { ...prev.profile, ...newProfile },
    }));
  };

  const setCurrentChapter = (chapterId: number) => {
    setProgress(prev => ({
      ...prev,
      currentChapterId: chapterId,
    }));
  };

  const markChapterCompleted = (chapterId: number) => {
    setProgress(prev => {
      const already = prev.completedChapters.includes(chapterId);
      const updated = already ? prev.completedChapters : [...prev.completedChapters, chapterId];
      
      // Also trigger badge unlock
      setTimeout(() => {
        checkAutoBadges(updated, prev.quizAttempts, prev.sandboxExploredCount);
      }, 100);

      return {
        ...prev,
        completedChapters: updated,
      };
    });
  };

  const saveQuizResult = (attempt: QuizAttempt) => {
    setProgress(prev => {
      const currentList = prev.quizAttempts[attempt.chapterId] || [];
      const updatedList = [attempt, ...currentList];
      const updatedAttempts = {
        ...prev.quizAttempts,
        [attempt.chapterId]: updatedList,
      };

      // If passed (score >= 70%), also mark chapter completed
      let updatedCompleted = prev.completedChapters;
      if (attempt.percentage >= 60 && !prev.completedChapters.includes(attempt.chapterId)) {
        updatedCompleted = [...prev.completedChapters, attempt.chapterId];
      }

      setTimeout(() => {
        checkAutoBadges(updatedCompleted, updatedAttempts, prev.sandboxExploredCount);
      }, 100);

      return {
        ...prev,
        completedChapters: updatedCompleted,
        quizAttempts: updatedAttempts,
      };
    });
  };

  const incrementSandboxAction = () => {
    setProgress(prev => {
      const newCount = prev.sandboxExploredCount + 1;
      setTimeout(() => {
        checkAutoBadges(prev.completedChapters, prev.quizAttempts, newCount);
      }, 100);
      return {
        ...prev,
        sandboxExploredCount: newCount,
      };
    });
  };

  const toggleSound = () => {
    setProgress(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const resetProgress = () => {
    setProgress({
      ...defaultProgress,
      profile: progress.profile,
    });
  };

  const closeBadgeCelebration = () => {
    setActiveBadgeCelebration(null);
  };

  // Derive badges with unlocked status
  const badges: Badge[] = INITIAL_BADGES.map(b => ({
    ...b,
    isUnlocked: progress.unlockedBadgeIds.includes(b.id),
  }));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        badges,
        activeBadgeCelebration,
        isBgmPlaying,
        bgmVolume,
        toggleBgm,
        setBgmVolume,
        closeBadgeCelebration,
        updateProfile,
        setCurrentChapter,
        markChapterCompleted,
        saveQuizResult,
        incrementSandboxAction,
        toggleSound,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
