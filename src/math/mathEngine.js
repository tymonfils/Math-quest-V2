import { gameState } from "../core/state.js";

let activeProblem = null;

// Helper: random integer between min and max (inclusive)
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick operation based on topic setting ("mixed" gives a true 50/50 or even split)
function pickOperation(allowedOps, topic) {
  if (topic === "addition" && allowedOps.includes("+")) return "+";
  if (topic === "subtraction" && allowedOps.includes("-")) return "-";
  if (topic === "multiplication" && allowedOps.includes("×")) return "×";
  if (topic === "division" && allowedOps.includes("÷")) return "÷";
  // Default "mixed": 50/50 split for 2 ops, or equal split for grade-appropriate ops
  return allowedOps[Math.floor(Math.random() * allowedOps.length)];
}

// --- GRADE K: Addition & Subtraction within 10 (50/50 split) ---
function generateGradeK(topic) {
  const op = pickOperation(["+", "-"], topic);
  if (op === "+") {
    const num1 = randInt(1, 5);
    const num2 = randInt(1, 10 - num1);
    return { num1, num2, operation: "+", answer: num1 + num2 };
  } else {
    const num1 = randInt(2, 10);
    const num2 = randInt(1, num1); // Guarantees no negative numbers
    return { num1, num2, operation: "-", answer: num1 - num2 };
  }
}

// --- GRADE 1: Addition & Subtraction within 20 (50/50 split) ---
function generateGrade1(topic) {
  const op = pickOperation(["+", "-"], topic);
  if (op === "+") {
    const num1 = randInt(2, 12);
    const num2 = randInt(2, 20 - num1);
    return { num1, num2, operation: "+", answer: num1 + num2 };
  } else {
    const num1 = randInt(6, 20);
    const num2 = randInt(2, num1 - 1);
    return { num1, num2, operation: "-", answer: num1 - num2 };
  }
}

// --- GRADE 2: 2-Digit Addition & Subtraction (50/50 split + Regrouping) ---
function generateGrade2({ topic = "mixed", regrouping = true }) {
  const op = pickOperation(["+", "-"], topic);

  if (op === "+") {
    let num1, num2;
    if (regrouping) {
      // Force ones digits to sum to >= 10 (carrying)
      const ones1 = randInt(2, 9);
      const ones2 = randInt(10 - ones1, 9);
      const tens1 = randInt(1, 5);
      const tens2 = randInt(1, 3);
      num1 = tens1 * 10 + ones1;
      num2 = tens2 * 10 + ones2;
    } else {
      const ones1 = randInt(1, 4);
      const ones2 = randInt(1, 9 - ones1);
      const tens1 = randInt(1, 5);
      const tens2 = randInt(1, 9 - tens1);
      num1 = tens1 * 10 + ones1;
      num2 = tens2 * 10 + ones2;
    }
    return { num1, num2, operation: "+", answer: num1 + num2 };
  } else {
    let num1, num2;
    if (regrouping) {
      // Top ones smaller than bottom ones (requires borrowing)
      const ones1 = randInt(0, 7);
      const ones2 = randInt(ones1 + 1, 9);
      const tens1 = randInt(3, 8);
      const tens2 = randInt(1, tens1 - 1);
      num1 = tens1 * 10 + ones1;
      num2 = tens2 * 10 + ones2;
    } else {
      const ones1 = randInt(2, 9);
      const ones2 = randInt(0, ones1);
      const tens1 = randInt(3, 8);
      const tens2 = randInt(1, tens1 - 1);
      num1 = tens1 * 10 + ones1;
      num2 = tens2 * 10 + ones2;
    }
    return { num1, num2, operation: "-", answer: num1 - num2 };
  }
}

// --- GRADE 3: Intro Multiplication, Division & 2/3-Digit Add/Sub ---
function generateGrade3(topic) {
  const op = pickOperation(["+", "-", "×", "÷"], topic);
  if (op === "×") {
    const num1 = randInt(2, 10);
    const num2 = randInt(2, 10);
    return { num1, num2, operation: "×", answer: num1 * num2 };
  }
  if (op === "÷") {
    const divisor = randInt(2, 9);
    const quotient = randInt(2, 9);
    const dividend = divisor * quotient;
    return { num1: dividend, num2: divisor, operation: "÷", answer: quotient };
  }
  if (op === "+") {
    const num1 = randInt(25, 150);
    const num2 = randInt(15, 99);
    return { num1, num2, operation: "+", answer: num1 + num2 };
  }
  const num1 = randInt(50, 180);
  const num2 = randInt(18, num1 - 10);
  return { num1, num2, operation: "-", answer: num1 - num2 };
}

// --- GRADE 4: Larger Multiplication (up to 12x12), Division & 3-Digit Add/Sub ---
function generateGrade4(topic) {
  const op = pickOperation(["+", "-", "×", "÷"], topic);
  if (op === "×") {
    const num1 = randInt(4, 12);
    const num2 = randInt(3, 12);
    return { num1, num2, operation: "×", answer: num1 * num2 };
  }
  if (op === "÷") {
    const divisor = randInt(3, 12);
    const quotient = randInt(3, 12);
    return { num1: divisor * quotient, num2: divisor, operation: "÷", answer: quotient };
  }
  if (op === "+") {
    const num1 = randInt(120, 499);
    const num2 = randInt(85, 399);
    return { num1, num2, operation: "+", answer: num1 + num2 };
  }
  const num1 = randInt(200, 650);
  const num2 = randInt(75, num1 - 25);
  return { num1, num2, operation: "-", answer: num1 - num2 };
}

// --- GRADE 5: 2-Digit by 1/2-Digit Multiplication, Advanced Division & 3-Digit Ops ---
function generateGrade5(topic) {
  const op = pickOperation(["+", "-", "×", "÷"], topic);
  if (op === "×") {
    const num1 = randInt(11, 25);
    const num2 = randInt(4, 12);
    return { num1, num2, operation: "×", answer: num1 * num2 };
  }
  if (op === "÷") {
    const divisor = randInt(4, 15);
    const quotient = randInt(5, 15);
    return { num1: divisor * quotient, num2: divisor, operation: "÷", answer: quotient };
  }
  if (op === "+") {
    const num1 = randInt(250, 799);
    const num2 = randInt(150, 599);
    return { num1, num2, operation: "+", answer: num1 + num2 };
  }
  const num1 = randInt(350, 950);
  const num2 = randInt(125, num1 - 50);
  return { num1, num2, operation: "-", answer: num1 - num2 };
}

export function generateProblem() {
  const settings = gameState.data.math || { grade: "2", topic: "mixed", regrouping: true };
  const grade = String(settings.grade).toUpperCase();
  const topic = settings.topic || "mixed";

  switch (grade) {
    case "K":
      activeProblem = generateGradeK(topic);
      break;
    case "1":
      activeProblem = generateGrade1(topic);
      break;
    case "2":
      activeProblem = generateGrade2(settings);
      break;
    case "3":
      activeProblem = generateGrade3(topic);
      break;
    case "4":
      activeProblem = generateGrade4(topic);
      break;
    case "5":
      activeProblem = generateGrade5(topic);
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
