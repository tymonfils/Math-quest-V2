import { gameState } from "../core/state.js";
import { generateGrade2 } from "./grade2.js";

export function generateProblem() {
  const settings = gameState.data.math;

  switch (settings.grade) {
    case "2":
      return generateGrade2(settings);
    // Future grade files plug in directly here:
    // case "K": return generateGradeK(settings);
    // case "1": return generateGrade1(settings);
    default:
      return generateGrade2(settings);
  }
}
