export const modelFeedback = {
  "Blake & Mouton": {
    high: "You balance care for people and results effectively.",
    mid: "You lean toward one style—consider developing the other dimension.",
    low: "You may struggle with balancing team and task focus."
  },
  "Goleman": {
    high: "You flexibly apply emotional intelligence styles as needed.",
    mid: "You use some emotional styles well—others need attention.",
    low: "You may be underutilizing the full range of EI-based leadership."
  },
  "Hersey-Blanchard": {
    high: "You adapt leadership to your team's development levels well.",
    mid: "You use some adaptability—try flexing more based on the situation.",
    low: "You may use one style rigidly—leadership maturity is situational."
  },
  "Lewin": {
    high: "You demonstrate effective use of directive and participative approaches.",
    mid: "You show partial style preferences—consider expanding your toolkit.",
    low: "You may not be consciously applying structured leadership approaches."
  },
  "Transformational": {
    high: "You inspire, motivate, and develop people at a transformational level.",
    mid: "You display some transformational traits—grow your influence further.",
    low: "You may be missing opportunities to uplift and engage your team."
  },
  "Transactional": {
    high: "You lead with clear expectations and accountability.",
    mid: "You balance transactional behaviors—sharpen follow-through.",
    low: "You may not be using reward/monitor systems effectively."
  },
  "Servant": {
    high: "You lead with deep empathy, listening, and service to others.",
    mid: "You demonstrate caring leadership—strengthen your stewardship.",
    low: "You may be overlooking the value of servant leadership principles."
  },
  "Authentic": {
    high: "You lead with integrity, self-awareness, and transparency.",
    mid: "You show signs of authenticity—strengthen consistency.",
    low: "You may not be fully grounded in your values or self-awareness."
  },
  "Charismatic": {
    high: "You influence and inspire others through confidence and vision.",
    mid: "You have some charismatic traits—build presence and credibility.",
    low: "You may lead more quietly—consider energizing your influence."
  },
  "Adaptive": {
    high: "You respond to change with agility, reflection, and systems thinking.",
    mid: "You flex under pressure—enhance with stronger systems thinking.",
    low: "You may struggle to adapt to rapid or complex change."
  }
};

export function generateFeedback(scores) {
  const feedback = {};
  for (const [model, score] of Object.entries(scores)) {
    if (score >= 7) feedback[model] = modelFeedback[model].high;
    else if (score >= 4) feedback[model] = modelFeedback[model].mid;
    else feedback[model] = modelFeedback[model].low;
  }
  return feedback;
}