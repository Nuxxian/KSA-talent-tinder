import React, { useState, useEffect, useCallback } from "react";
import SwipeableCard from "./SwipeableCard";
import type { Question, Talent } from "./types";

interface SwipeAction {
  question: Question;
  direction: "left" | "right";
  timestamp: number;
}

interface CardSliderProps {
  questions: Question[];
  onQuestionSwipeLeft?: (question: Question) => void;
  onQuestionSwipeRight?: (question: Question) => void;
  onAllCardsProcessed?: () => void;
  selectedTalents: Talent[];
  done: boolean;
  onRestart: () => void;
  onBackToOverview: () => void;
  className?: string;
}

const CardSlider: React.FC<CardSliderProps> = ({
  questions,
  onQuestionSwipeLeft,
  onQuestionSwipeRight,
  onAllCardsProcessed,
  selectedTalents,
  done,
  onRestart,
  onBackToOverview,
  className = "",
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<SwipeAction[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showingResults, setShowingResults] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("ksa-talents-progress");
    if (savedProgress) {
      try {
        const { currentIndex, history } = JSON.parse(savedProgress);
        if (currentIndex < questions.length) {
          setCurrentQuestionIndex(currentIndex);
          setSwipeHistory(history || []);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    }
  }, [questions]);

  // Save progress to localStorage
  const saveProgress = useCallback((index: number, history: SwipeAction[]) => {
    localStorage.setItem(
      "ksa-talents-progress",
      JSON.stringify({
        currentIndex: index,
        history: history,
      }),
    );
  }, []);

  const handleSwipeLeft = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && !isAnimating) {
      setIsAnimating(true);

      const newHistory = [
        ...swipeHistory,
        {
          question: currentQuestion,
          direction: "left" as const,
          timestamp: Date.now(),
        },
      ];

      setSwipeHistory(newHistory);
      onQuestionSwipeLeft?.(currentQuestion);

      const newIndex = currentQuestionIndex + 1;
      saveProgress(newIndex, newHistory);

      if (currentQuestionIndex >= questions.length - 1) {
        setTimeout(() => {
          onAllCardsProcessed?.();
          setIsAnimating(false);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(newIndex);
          setIsAnimating(false);
        }, 300);
      }
    }
  }, [
    questions,
    currentQuestionIndex,
    swipeHistory,
    isAnimating,
    onQuestionSwipeLeft,
    onAllCardsProcessed,
    saveProgress,
  ]);

  const handleSwipeRight = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && !isAnimating) {
      setIsAnimating(true);

      const newHistory = [
        ...swipeHistory,
        {
          question: currentQuestion,
          direction: "right" as const,
          timestamp: Date.now(),
        },
      ];

      setSwipeHistory(newHistory);
      onQuestionSwipeRight?.(currentQuestion);

      const newIndex = currentQuestionIndex + 1;
      saveProgress(newIndex, newHistory);

      if (currentQuestionIndex >= questions.length - 1) {
        setTimeout(() => {
          onAllCardsProcessed?.();
          setIsAnimating(false);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(newIndex);
          setIsAnimating(false);
        }, 300);
      }
    }
  }, [
    questions,
    currentQuestionIndex,
    swipeHistory,
    isAnimating,
    onQuestionSwipeRight,
    onAllCardsProcessed,
    saveProgress,
  ]);

  const reset = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSwipeHistory([]);
    // Clear all localStorage data
    localStorage.removeItem("ksa-talents-progress");
    localStorage.removeItem("ksa-talents-selected");
    localStorage.removeItem("ksa-talents-rejected");
    localStorage.removeItem("ksa-talents-results");
    localStorage.removeItem("ksa-talents-last-completed");
  }, []);

  // Check if there are saved results
  const getSavedResultsInfo = () => {
    const savedResults = localStorage.getItem("ksa-talents-results");
    try {
      if (savedResults) {
        const results = JSON.parse(savedResults);
        const talentCount = results.talents?.length || 0;
        return {
          hasSavedResults: talentCount > 0,
          talentCount,
          date: results.date ? new Date(results.date) : null,
        };
      }
      return { hasSavedResults: false, talentCount: 0, date: null };
    } catch {
      return { hasSavedResults: false, talentCount: 0, date: null };
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Show results if questionnaire is done or if user clicked to view saved results
  if (done || showingResults) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 pb-6 max-w-lg mx-auto bg-white">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">🎯</div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--ksa-text)" }}
            >
              {showingResults
                ? "Jouw Opgeslagen Resultaten"
                : "Jouw Geselecteerde Talenten"}
            </h2>
            <p
              className="text-sm mb-2"
              style={{ color: "var(--ksa-text-light)" }}
            >
              {showingResults
                ? "Dit zijn je eerder opgeslagen resultaten"
                : "Dit zijn de talenten die bij jou passen op basis van de vragenlijst"}
            </p>
          </div>

          {/* Selected Talents List */}
          {selectedTalents.length > 0 ? (
            <div className="space-y-3 mb-6">
              {selectedTalents.map((talent) => (
                <div
                  key={talent.id}
                  className="p-4 rounded-lg ksa-card border border-gray-100"
                  style={{
                    backgroundColor: "white",
                    borderLeft: `4px solid ${talent.color || "var(--ksa-blue)"}`,
                  }}
                >
                  <h3
                    className="font-semibold text-lg mb-1"
                    style={{ color: talent.color || "var(--ksa-blue)" }}
                  >
                    {talent.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--ksa-text-light)" }}
                  >
                    {talent.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-3">🤷‍♀️</div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--ksa-text)" }}
                >
                  Geen talenten gevonden
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--ksa-text-light)" }}
                >
                  Je hebt geen talenten geselecteerd tijdens de vragenlijst.
                  Probeer opnieuw en antwoord "Ja" op vragen die bij jou passen.
                </p>
              </div>
            </div>
          )}

          {/* Summary */}
          {selectedTalents.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--ksa-blue)" }}
                >
                  📊 Jouw Talent Profiel
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--ksa-text-light)" }}
                >
                  Je hebt{" "}
                  <strong>{selectedTalents.length} van de 8 talenten</strong>{" "}
                  als sterk punt geïdentificeerd
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {showingResults && (
              <button
                onClick={() => setShowingResults(false)}
                className="w-full ksa-button-secondary text-sm"
              >
                ↩️ Terug naar Vragenlijst
              </button>
            )}
            <button onClick={onRestart} className="w-full ksa-button text-sm">
              🔄 Vragenlijst Opnieuw Doen
            </button>
            <button
              onClick={onBackToOverview}
              className="w-full ksa-button-secondary text-sm"
            >
              📋 Alle Talenten Bekijken
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className={`text-center p-6 ${className}`}>
        <div className="bg-white rounded-lg ksa-card p-6 w-full max-w-sm mx-auto">
          <div className="text-3xl mb-3">🎉</div>
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "var(--ksa-text)" }}
          >
            Vragenlijst voltooid!
          </h2>
          <p
            className="text-sm mb-5"
            style={{ color: "var(--ksa-text-light)" }}
          >
            Je hebt alle vragen beantwoord! Nu kun je je talenten bekijken.
          </p>
          <div className="space-y-2">
            <button onClick={reset} className="ksa-button text-sm w-full">
              Opnieuw Beginnen
            </button>
            <p className="text-xs" style={{ color: "var(--ksa-text-light)" }}>
              Jouw antwoorden:{" "}
              {swipeHistory.filter((h) => h.direction === "right").length} van{" "}
              {swipeHistory.length} vragen
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col px-4 py-6">
      {/* View Results Button - Top */}
      {(() => {
        const resultsInfo = getSavedResultsInfo();
        return resultsInfo.hasSavedResults ? (
          <div className="w-full max-w-lg mx-auto mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
              <p className="text-green-700 text-xs text-center">
                Je hebt al een keer de vragenlijst ingevuld!
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  const savedResults = localStorage.getItem(
                    "ksa-talents-results",
                  );
                  if (savedResults) {
                    try {
                      const results = JSON.parse(savedResults);
                      if (results.talents && Array.isArray(results.talents)) {
                        setShowingResults(true);
                      }
                    } catch (error) {
                      console.error("Failed to load results:", error);
                    }
                  }
                }}
                className="inline-flex flex-col items-center px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
                aria-label={`Bekijk vorige resultaten met ${resultsInfo.talentCount} gevonden talenten`}
              >
                <div className="flex items-center">
                  <span className="mr-2">📊</span>
                  Bekijk Mijn Vorige Resultaten
                </div>
                <span className="text-xs text-green-100 mt-1">
                  {resultsInfo.talentCount} talent
                  {resultsInfo.talentCount !== 1 ? "en" : ""} gevonden
                </span>
              </button>
            </div>
          </div>
        ) : null;
      })()}

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg relative">
          {/* Card container */}
          <div className="relative h-[70vh] max-h-[500px] min-h-[400px]">
            <SwipeableCard
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              swipeThreshold={50}
              disabled={isAnimating}
              className="absolute inset-0"
            >
              <div
                className="h-full w-full rounded-xl shadow-xl p-6 flex flex-col justify-between"
                style={{
                  background: currentQuestion.color || "var(--ksa-blue)",
                }}
              >
                {/* Question content */}
                <div className="flex-1 flex flex-col justify-center text-center">
                  <div className="text-4xl mb-6">🤔</div>
                  <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                    {currentQuestion.text}
                  </h3>
                  <p className="text-white/70 text-sm">
                    Swipe naar rechts voor "Ja" of naar links voor "Nee"
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handleSwipeLeft}
                    disabled={isAnimating}
                    className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-8 py-3 rounded-full transition-all border border-white/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>👎</span>
                      <span>Nee</span>
                    </span>
                  </button>
                  <button
                    onClick={handleSwipeRight}
                    disabled={isAnimating}
                    className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-8 py-3 rounded-full transition-all border border-white/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>👍</span>
                      <span>Ja</span>
                    </span>
                  </button>
                </div>
              </div>
            </SwipeableCard>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex justify-center space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className="h-2 w-8 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    index < currentQuestionIndex
                      ? "var(--ksa-blue)"
                      : index === currentQuestionIndex
                        ? "var(--ksa-blue-light)"
                        : "#e5e7eb",
                }}
              />
            ))}
          </div>

          {/* Question counter */}
          <div
            className="text-center mt-3 text-sm font-medium"
            style={{ color: "var(--ksa-text-light)" }}
          >
            Vraag {currentQuestionIndex + 1} van {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
