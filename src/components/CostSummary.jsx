export default function CostSummary({
  totalCost,
}) {
  let color = "text-green-600";

  if (totalCost > 5000)
    color = "text-red-600";
  else if (totalCost > 2000)
    color = "text-yellow-500";

  return (
    <div className="bg-gray-100 p-5 rounded-xl">
      <h2 className="text-xl font-bold">
        Total Cost
      </h2>

      <p
        className={`text-4xl font-bold mt-2 ${color}`}
      >
        ₹{totalCost.toFixed(2)}
      </p>
    </div>
  );
}