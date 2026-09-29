export function generateGrade2(options = {}) {
  const { topic = "subtraction", regrouping = true } = options;

  if (topic === "addition") {
    let num1, num2;
    if (regrouping) {
      // Force ones digits to sum to >= 10
      const ones1 = Math.floor(Math.random() * 8) + 2; 
      const ones2 = Math.floor(Math.random() * (9 - (10 - ones1) + 1)) + (10 - ones1);
      const tens1 = Math.floor(Math.random() * 5) + 1;
      const tens2 = Math.floor(Math.random() * 4) + 1;
      num1 = tens1 * 10 + ones1;
      num2 = tens2 * 10 + ones2;
    } else {
      // No carry: ones sum < 10, tens sum < 10
      const ones1 = Math.floor(Math.random() * 5);
      const ones2 = Math.floor(Math.random() * (9 - ones1));
      const tens1 = Math.floor(Math.random() * 5) + 1;
      const tens2 = Math.floor(Math.random() * (9 - tens1));
      num1 = tens1 * 10 + ones1;
      num2 = tens2 * 10 + ones2;
    }
    return {
      num1,
      num2,
      operation: "+",
      answer: num1 + num2
    };
  }

  // Default: Subtraction
  let num1, num2;
  if (regrouping) {
    // Top ones must be smaller than bottom ones (requires borrowing)
    const ones1 = Math.floor(Math.random() * 8); // 0 through 7
    const ones2 = Math.floor(Math.random() * (9 - ones1)) + (ones1 + 1); // strictly greater than ones1
    const tens1 = Math.floor(Math.random() * 6) + 3; // 3 through 8
    const tens2 = Math.floor(Math.random() * (tens1 - 1)) + 1; // strictly less than tens1
    num1 = tens1 * 10 + ones1;
    num2 = tens2 * 10 + ones2;
  } else {
    // No borrow: top ones >= bottom ones, top tens >= bottom tens
    const ones1 = Math.floor(Math.random() * 8) + 2;
    const ones2 = Math.floor(Math.random() * (ones1 + 1));
    const tens1 = Math.floor(Math.random() * 6) + 3;
    const tens2 = Math.floor(Math.random() * tens1) + 1;
    num1 = tens1 * 10 + ones1;
    num2 = tens2 * 10 + ones2;
  }

  return {
    num1,
    num2,
    operation: "-",
    answer: num1 - num2
  };
}
