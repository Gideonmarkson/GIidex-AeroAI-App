import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, XCircle, Award, RefreshCcw, Sparkles, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../utils/aiModels';

export default function KnowledgeQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('gidex_aeroai_quiz_highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  const handleSelectOption = (questionId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('gidex_aeroai_quiz_highscore', score.toString());
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const finalScore = submitted ? calculateScore() : 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Banner */}
      <div className="glass-panel rounded-2xl p-6 border-cyan-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider border border-cyan-400/30">
            MODULE 04 • KNOWLEDGE CHECK
          </span>
          <h2 className="text-2xl font-black text-white tracking-wide">
            Aerospace AI Knowledge Assessment
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Test your understanding of multivariate neural diagnostics, digital twin synchronization, and reinforcement learning trajectory optimization.
          </p>
        </div>

        {/* High Score Badge */}
        <div className="bg-gray-900/90 px-4 py-3 rounded-xl border border-cyan-500/30 flex items-center gap-3 shrink-0">
          <Award className="w-7 h-7 text-amber-400" />
          <div>
            <span className="text-[10px] text-gray-400 font-mono block">PERSONAL BEST SCORE</span>
            <span className="text-xl font-black text-white font-mono">{highScore}%</span>
          </div>
        </div>
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div key={q.id} className="glass-panel rounded-2xl p-6 border-cyan-500/20 space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs shrink-0 border border-cyan-400/30">
                  0{idx + 1}
                </span>
                <h3 className="text-sm font-semibold text-white leading-relaxed">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let btnStyle = 'bg-gray-900/60 text-gray-300 border-gray-800 hover:border-cyan-500/50';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-medium';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-red-500/20 text-red-300 border-red-500/60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-cyan-sm font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all border flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Callout (Show after submit) */}
              {submitted && (
                <div className={`mt-3 p-3.5 rounded-xl text-xs font-mono border ${
                  isCorrect ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-red-950/40 border-red-500/30 text-red-200'
                }`}>
                  <strong className="block mb-1">{isCorrect ? '✓ Correct Explanation:' : '✗ Concept Review:'}</strong>
                  <p className="leading-relaxed font-sans">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer & Results Modal */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-6 rounded-2xl border-cyan-500/30">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
              Object.keys(selectedAnswers).length === QUIZ_QUESTIONS.length
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-cyan-glow hover:opacity-90'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
          >
            Submit Assessment
          </button>
        ) : (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black font-mono text-cyan-300">
                {finalScore}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {finalScore >= 75 ? '🎉 Aerospace AI Expert!' : '📚 Good Effort - Keep Exploring!'}
                </h4>
                <p className="text-xs text-gray-400">
                  {finalScore >= 75 ? 'You have mastered core aerospace AI concepts.' : 'Review the slider simulations to reinforce your understanding.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gray-800 hover:bg-gray-700 text-cyan-300 border border-cyan-500/30 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
