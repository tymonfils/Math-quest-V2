import { gameState } from "../core/state.js";
import { generateGrade2 } from "./grade2.js";

let activeProblem = null;

export function generateProblem() {
  const settings = gameState.data.math;

  switch (settings.grade) {
    case "2":
      activeProblem = generateGrade2(settings);
      break;
    default:
      activeProblem = generateGrade2(settings);
      break;
  }
  return activeProblem;
}

export function getCurrentProblem() {
  if (!activeProblem) {
    return generateProblem();
  }
  return activeProblem;
}

export function submitAnswer(userVal) {
  const numericVal = parseInt(userVal, 10);
  if (isNaN(numericVal) || !activeProblem) {
    return { success: false, ignored: true };
  }

  const isCorrect = numericVal === activeProblem.answer;

  if (isCorrect) {
    if (window.Economy) {
      window.Economy.awardCorrectAnswer();
    }
    const solvedProblem = activeProblem;
    generateProblem();
    return { success: true, answer: solvedProblem.answer };
  } else {
    if (window.Economy) {
      window.Economy.penalizeWrongAnswer();
    }
    return { success: false, answer: activeProblem.answer };
  }
}
