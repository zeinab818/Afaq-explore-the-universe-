/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { cosmicQuestions } from "@/data/CosmicQuestions";
import {
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  Telescope,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

const QUESTIONS_PER_ROUND = 10;

type CosmicQuestion = (typeof cosmicQuestions)[number];

function shuffleQuestions(): CosmicQuestion[] {
  const questions = [...cosmicQuestions];

  // Fisher-Yates shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions.slice(
    0,
    Math.min(QUESTIONS_PER_ROUND, questions.length)
  );
}

function getPoints(question: CosmicQuestion): number {
  const questionWithPoints = question as CosmicQuestion & {
    points?: number;
  };

  if (questionWithPoints.points != null) {
    return questionWithPoints.points;
  }

  switch (question.difficulty) {
    case "Hard":
      return 300;
    case "Medium":
      return 200;
    default:
      return 100;
  }
}

export default function CosmicQuestions() {
  const quizRef = useRef<HTMLElement>(null);

  // Stable initial state prevents server/client hydration mismatches.
  const [roundQuestions, setRoundQuestions] = useState<CosmicQuestion[]>(
    () => cosmicQuestions.slice(0, QUESTIONS_PER_ROUND)
  );

  const [quizIndex, setQuizIndex] = useState(0);

  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(
    () =>
      Array(
        Math.min(QUESTIONS_PER_ROUND, cosmicQuestions.length)
      ).fill(null)
  );

  const [quizFinished, setQuizFinished] = useState(false);

  // Shuffle only after hydration, in the browser.
  useEffect(() => {
    const firstRound = shuffleQuestions();

    setRoundQuestions(firstRound);
    setQuizAnswers(Array(firstRound.length).fill(null));
  }, []);

  const totalQuestions = roundQuestions.length;
  const currentQuestion = roundQuestions[quizIndex];
  const currentAnswer = quizAnswers[quizIndex];

  const answeredCount = quizAnswers.filter(
    (answer) => answer !== null
  ).length;

  const correctAnswers = quizAnswers.filter(
    (answer, index) =>
      answer !== null &&
      answer === roundQuestions[index]?.correct
  ).length;

  const accuracy =
    answeredCount > 0
      ? Math.round((correctAnswers / answeredCount) * 100)
      : 0;

  const { quizScore, bestCombo } = useMemo(() => {
    let score = 0;
    let streak = 0;
    let best = 0;

    quizAnswers.forEach((answer, index) => {
      if (answer === null) return;

      const question = roundQuestions[index];

      if (!question) return;

      if (answer === question.correct) {
        streak += 1;
        best = Math.max(best, streak);

        // Every third consecutive correct answer adds 50 bonus points.
        const comboBonus = Math.floor(streak / 3) * 50;

        score += getPoints(question) + comboBonus;
      } else {
        streak = 0;
      }
    });

    return { quizScore: score, bestCombo: best };
  }, [quizAnswers, roundQuestions]);

  const currentStreak = useMemo(() => {
    let streak = 0;

    for (let index = 0; index <= quizIndex; index++) {
      const answer = quizAnswers[index];
      const question = roundQuestions[index];

      if (answer === null || !question) break;

      if (answer === question.correct) {
        streak += 1;
      } else {
        streak = 0;
      }
    }

    return streak;
  }, [quizAnswers, quizIndex, roundQuestions]);

  const answerQuestion = (optionIndex: number) => {
    if (currentAnswer !== null || quizFinished || !currentQuestion) {
      return;
    }

    setQuizAnswers((previous) =>
      previous.map((answer, index) =>
        index === quizIndex ? optionIndex : answer
      )
    );
  };

  const nextQuestion = () => {
    if (currentAnswer === null) return;

    if (quizIndex >= totalQuestions - 1) {
      setQuizFinished(true);
      return;
    }

    setQuizIndex((previous) => previous + 1);

    requestAnimationFrame(() => {
      quizRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const restartQuiz = () => {
    const nextRound = shuffleQuestions();

    setRoundQuestions(nextRound);
    setQuizIndex(0);
    setQuizAnswers(Array(nextRound.length).fill(null));
    setQuizFinished(false);

    requestAnimationFrame(() => {
      quizRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const resultMessage =
    accuracy === 100
      ? "Perfect mission! Your cosmic knowledge is out of this world."
      : accuracy >= 80
        ? "Incredible work! You're becoming a true cosmic explorer."
        : accuracy >= 60
          ? "Great journey! Keep exploring and uncovering cosmic mysteries."
          : "Every explorer starts somewhere. Your next discovery awaits.";

  if (!currentQuestion) {
    return null;
  }

  return (
    <section
      ref={quizRef}
      id="cosmic-check"
      className="scroll-mt-24 px-6 pb-24 sm:px-10 lg:px-16 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-4xl border border-violet-300/15 bg-[#101321] px-6 py-9 sm:px-10 sm:py-14 lg:px-16">
          <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-violet-500/9 blur-3xl" />
          <div className="absolute -bottom-32 left-[20%] -z-10 h-64 w-64 rounded-full bg-[#e7c98b]/6 blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Introduction and result summary */}
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/8 text-violet-200">
                <Telescope size={22} />
              </span>

              <p className="mt-6 text-[10px] tracking-[0.22em] text-violet-300">
                THE COSMIC CHECK
              </p>

              <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">
                How well do you
                <span className="mt-1 block font-serif italic text-[#e7c98b]">
                  know the universe?
                </span>
              </h2>

           
            <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
              {cosmicQuestions.length} questions in the cosmic
              collection. Take on a {Math.floor(cosmicQuestions.length / 3)}-question mission, build your
              combo, and discover how much you know about the universe.
            </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  `${cosmicQuestions.length} Questions`,
                  `${totalQuestions} Per Round`,
                  "Combo Bonus",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-2 text-[10px] text-white/55"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {quizFinished && (
                <div className="mt-8 border-l border-[#e7c98b]/50 pl-4">
                  <p className="text-xs tracking-[0.16em] text-[#e7c98b]">
                    YOUR COSMIC RESULT
                  </p>

                  <p className="mt-2 text-4xl font-medium">
                    {quizScore.toLocaleString()}
                    <span className="ml-2 text-sm text-white/35">
                      points
                    </span>
                  </p>

                  <p className="mt-2 text-sm text-white/55">
                    {correctAnswers} of {totalQuestions} correct
                    {" · "}
                    {accuracy}% accuracy
                  </p>

                  <p className="mt-2 text-sm text-white/55">
                    Best combo: ×{bestCombo}
                  </p>
                </div>
              )}
            </div>

            {/* Interactive quiz */}
            <div className="rounded-2xl border border-white/10 bg-[#070a12]/65 p-5 sm:p-8">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] tracking-[0.18em] text-white/45">
                      QUESTION{" "}
                      {String(quizIndex + 1).padStart(2, "0")} /{" "}
                      {String(totalQuestions).padStart(2, "0")}
                    </span>

                    <span className="rounded-full border border-violet-300/20 px-3 py-1 text-[10px] text-violet-200">
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  <div
                    className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-label="Quiz progress"
                    aria-valuemin={0}
                    aria-valuemax={totalQuestions}
                    aria-valuenow={
                      quizIndex + (currentAnswer !== null ? 1 : 0)
                    }
                  >
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-400 to-[#e7c98b] transition-all duration-500"
                      style={{
                        width: `${
                          ((quizIndex +
                            (currentAnswer !== null ? 1 : 0)) /
                            totalQuestions) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-white/50">
                      <Sparkles
                        size={14}
                        className="mr-1 inline text-[#e7c98b]"
                      />
                      {getPoints(currentQuestion)} points
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        currentStreak >= 3
                          ? "border-[#e7c98b]/40 bg-[#e7c98b]/10 text-[#e7c98b]"
                          : "border-white/10 text-white/45"
                      }`}
                    >
                      <Sparkles size={13} className="mr-1 inline" />
                      Combo ×{currentStreak}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-medium leading-relaxed sm:text-2xl">
                    {currentQuestion.question}
                  </h3>

                  <div className="mt-6 grid gap-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = currentAnswer === index;
                      const isCorrect = currentQuestion.correct === index;
                      const hasAnswered = currentAnswer !== null;

                      let optionStyle =
                        "border-white/10 bg-white/[0.025] text-white/75 hover:border-violet-300/40 hover:bg-violet-300/[0.05]";

                      if (hasAnswered && isCorrect) {
                        optionStyle =
                          "border-emerald-300/40 bg-emerald-300/[0.08] text-emerald-100";
                      } else if (hasAnswered && isSelected && !isCorrect) {
                        optionStyle =
                          "border-rose-300/40 bg-rose-300/[0.08] text-rose-100";
                      }

                      return (
                        <button
                          key={`${option}-${index}`}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => answerQuestion(index)}
                          aria-pressed={isSelected}
                          className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition disabled:cursor-default ${optionStyle}`}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-current/20 text-xs">
                            {String.fromCharCode(65 + index)}
                          </span>

                          <span className="flex-1">{option}</span>

                          {hasAnswered && isCorrect && (
                            <Check size={17} className="shrink-0" />
                          )}

                          {hasAnswered && isSelected && !isCorrect && (
                            <X size={17} className="shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {currentAnswer !== null && (
                    <div
                      aria-live="polite"
                      className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <p
                        className={`text-sm font-medium ${
                          currentAnswer === currentQuestion.correct
                            ? "text-emerald-200"
                            : "text-rose-200"
                        }`}
                      >
                        {currentAnswer === currentQuestion.correct
                          ? "Exactly right!"
                          : `Not quite. The correct answer is ${currentQuestion.options[currentQuestion.correct]}.`}
                      </p>

                      <p className="mt-2 text-sm leading-7 text-white/55">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="text-xs text-white/40">
                      Score: {quizScore.toLocaleString()} pts
                    </p>

                    <button
                      type="button"
                      disabled={currentAnswer === null}
                      onClick={nextQuestion}
                      className="inline-flex items-center gap-2 rounded-full bg-[#e7c98b] px-5 py-3 text-sm font-semibold text-[#070a12] transition hover:bg-[#f1ddb0] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {quizIndex === totalQuestions - 1
                        ? "See my results"
                        : "Next question"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center sm:py-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#e7c98b]/30 bg-[#e7c98b]/10 text-[#e7c98b]">
                    <Sparkles size={27} />
                  </div>

                  <p className="mt-6 text-[10px] tracking-[0.2em] text-violet-300">
                    MISSION COMPLETE
                  </p>

                  <h3 className="mt-3 text-3xl font-medium sm:text-4xl">
                    {quizScore.toLocaleString()} pts
                  </h3>

                  <p className="mt-3 text-sm text-white/55">
                    {correctAnswers} / {totalQuestions} correct
                    {" · "}
                    {accuracy}% accuracy
                  </p>

                  <p className="mt-2 text-sm text-[#e7c98b]">
                    Best combo: ×{bestCombo}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {resultMessage}
                  </p>

                  <div className="mx-auto mt-7 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-400 to-[#e7c98b] transition-all duration-500"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition hover:border-[#e7c98b]/50 hover:text-[#e7c98b]"
                  >
                    <RotateCcw size={15} />
                    Explore again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
