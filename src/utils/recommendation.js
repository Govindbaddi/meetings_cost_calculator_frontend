export const getRecommendation = (
  cost,
  agenda
) => {
  let score = 0;

  const text = agenda.toLowerCase();

  if (cost > 5000) score -= 2;
  else if (cost > 2000) score -= 1;

  const strongKeywords = [
    "decision",
    "planning",
    "release",
    "client",
    "incident",
    "architecture",
  ];

  const weakKeywords = [
    "update",
    "sync",
    "catchup",
    "discussion",
  ];

  if (
    strongKeywords.some((word) =>
      text.includes(word)
    )
  ) {
    score += 2;
  }

  if (
    weakKeywords.some((word) =>
      text.includes(word)
    )
  ) {
    score -= 1;
  }

  return score > 0
    ? {
        text: "✅ Worth Conducting",
        color: "text-green-600",
      }
    : {
        text: "❌ Consider Email / Slack",
        color: "text-red-600",
      };
};