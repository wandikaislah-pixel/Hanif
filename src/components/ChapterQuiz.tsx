import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Chapter, QuizQuestion } from '../types';
import { playSound } from '../utils/sound';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface Props {
  chapter: Chapter;
  onBackToStory: () => void;
  onNextChapter?: () => void;
}

export const ChapterQuiz: React.FC<Props> = ({ chapter, onBackToStory, onNextChapter }) => {
  const { progress, saveQuizResult, markChapterCompleted } = useProgress();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = chapter.quiz[currentIdx];
  const totalQuestions = chapter.quiz.length;

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    playSound.click(progress.soundEnabled);
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const chosen = currentQ.options.find(o => o.id === selectedOptionId);
    const isCorrect = !!chosen?.isCorrect;

    if (isCorrect) {
      playSound.success(progress.soundEnabled);
      setScore(prev => prev + 1);
    } else {
      playSound.error(progress.soundEnabled);
    }

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    playSound.pageTurn(progress.soundEnabled);
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const finalScore = score + (selectedOptionId && currentQ.options.find(o => o.id === selectedOptionId)?.isCorrect ? 0 : 0);
    // Note: score was already incremented in handleSubmitAnswer
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    // Save result to Context
    saveQuizResult({
      chapterId: chapter.id,
      score: finalScore,
      totalQuestions,
      percentage,
      completedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    if (percentage >= 60) {
      markChapterCompleted(chapter.id);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      playSound.badgeUnlock(progress.soundEnabled);
    } else {
      playSound.error(progress.soundEnabled);
    }
  };

  const handleRestartQuiz = () => {
    playSound.click(progress.soundEnabled);
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const finalPercentage = Math.round((score / totalQuestions) * 100);
    const isPassed = finalPercentage >= 60;
    const isPerfect = finalPercentage === 100;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 comic-panel-lg shadow-2xl text-center">
        {/* Celebration Trophy Header */}
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-5xl mx-auto shadow-md">
            {isPerfect ? '👑' : isPassed ? '🏆' : '💪'}
          </div>
          {isPassed && (
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2 shadow">
              <Sparkles className="w-5 h-5" />
            </div>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-800">
          {isPerfect ? 'Luar Biasa! Skor Sempurna! 🌟' : isPassed ? 'Hebat Sekali! Kamu Lulus! 🎉' : 'Ayo Semangat, Coba Lagi! 👍'}
        </h3>

        <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto font-medium">
          {isPassed
            ? `Kamu berhasil menyelesaikan kuis ${chapter.title} dengan pemahaman pecahan yang mantap!`
            : 'Kamu hampir berhasil! Ulangi membaca cerita komiknya dan coba kuis ini sekali lagi ya!'}
        </p>

        {/* Score Card Box */}
        <div className="my-6 bg-gradient-to-br from-amber-50 to-orange-50 border-3 border-amber-300 rounded-2xl p-5 max-w-sm mx-auto shadow-inner">
          <span className="text-xs font-bold text-amber-900 uppercase">Nilai Kuis Kamu</span>
          <div className="flex items-center justify-center gap-2 my-2">
            <span className="text-5xl font-black text-orange-600">{score}</span>
            <span className="text-2xl font-bold text-slate-400">/</span>
            <span className="text-3xl font-extrabold text-slate-600">{totalQuestions}</span>
          </div>
          <div className="text-lg font-black text-amber-950">
            {finalPercentage}% Jawaban Benar
          </div>

          {isPassed && (
            <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
              <Trophy className="w-4 h-4 text-emerald-600" />
              Lencana Bab #{chapter.id} Berhasil Didapatkan!
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRestartQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border-2 border-slate-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Kuis
          </button>

          <button
            onClick={onBackToStory}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm comic-panel-sm transition"
          >
            Baca Ulang Cerita
          </button>

          {onNextChapter && isPassed && (
            <button
              onClick={onNextChapter}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm comic-panel-sm transition"
            >
              Lanjut Bab Berikutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-5 sm:p-8 comic-panel-lg shadow-xl">
      {/* Top Quiz Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 mb-5">
        <div>
          <span className="inline-block bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-xs">
            Kuis Tantangan {chapter.title}
          </span>
          <h3 className="font-heading font-black text-xl text-slate-800 mt-1">
            Uji Pemahamanmu! 🎯
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Soal</span>
          <div className="bg-orange-500 text-white font-black text-sm px-3 py-1 rounded-xl shadow-xs">
            {currentIdx + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-comic">
          {currentQ.question}
        </h4>

        {currentQ.visualHint && (
          <p className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg mt-2 inline-block">
            🔍 <em>Petunjuk: {currentQ.visualHint}</em>
          </p>
        )}
      </div>

      {/* Answer Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map(option => {
          const isSelected = selectedOptionId === option.id;
          let btnStyle = 'border-slate-200 bg-slate-50/60 hover:bg-orange-50 hover:border-orange-300 text-slate-800';

          if (isAnswerSubmitted) {
            if (option.isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
            } else {
              btnStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'border-orange-500 bg-orange-50 text-orange-950 ring-2 ring-orange-300 font-bold';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 rounded-2xl border-3 transition-all flex items-center justify-between gap-3 text-base sm:text-lg font-comic ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center font-black text-xs text-slate-700 uppercase shadow-2xs">
                  {option.id}
                </span>
                <span>{option.text}</span>
              </div>

              {isAnswerSubmitted && option.isCorrect && (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              )}
              {isAnswerSubmitted && isSelected && !option.isCorrect && (
                <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner when answered */}
      {isAnswerSubmitted && (
        <div
          className={`p-4 rounded-2xl mb-6 border-2 flex items-start gap-3 transition-all ${
            currentQ.options.find(o => o.id === selectedOptionId)?.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <span className="text-2xl">
            {currentQ.options.find(o => o.id === selectedOptionId)?.isCorrect ? '🎉' : '💡'}
          </span>
          <div className="text-xs sm:text-sm font-medium leading-relaxed">
            <span className="font-extrabold uppercase block mb-0.5">
              {currentQ.options.find(o => o.id === selectedOptionId)?.isCorrect
                ? 'Jawabanmu Tepat Sekali!'
                : 'Yuk Pahami Penjelasannya:'}
            </span>
            {currentQ.explanation}
          </div>
        </div>
      )}

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <button
          onClick={onBackToStory}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
        >
          ← Kembali ke Cerita
        </button>

        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOptionId}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-extrabold text-sm comic-panel-sm transition"
          >
            Kunci Jawaban!
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm comic-panel-sm transition"
          >
            {currentIdx + 1 < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
