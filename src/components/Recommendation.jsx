import { getRecommendation } from "../utils/recommendation";

export default function Recommendation({
  cost,
  agenda,
}) {
  const result =
    getRecommendation(cost, agenda);

  return (
    <div className="bg-yellow-50 p-5 rounded-xl">
      <h2 className="text-xl font-bold mb-2">
        Recommendation
      </h2>

      <p
        className={`font-semibold ${result.color}`}
      >
        {result.text}
      </p>
    </div>
  );
}