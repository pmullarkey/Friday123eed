import { questions } from "./data/questions";

export function calculateScores(answers) {
  const scores = {};

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer !== undefined) {
      const score = q.polarity === "positive" ? answer : (6 - answer);
      if (!scores[q.model]) scores[q.model] = { total: 0, count: 0 };
      scores[q.model].total += score;
      scores[q.model].count += 1;
    }
  });

  const normalized = {};
  Object.entries(scores).forEach(([model, data]) => {
    const raw = data.total;
    const max = data.count * 5;
    normalized[model] = Math.round((raw / max) * 9 * 10) / 10;
  });

  return normalized;
}