"use client";

export default function StatsCards({ jobs, pendingCount, completedCount }: { jobs: unknown[]; pendingCount: number; completedCount: number }) {
  const cards = [
    {
      label: "Total Assigned",
      value: jobs.length,
      emoji: <img src="/total.svg" alt="" />,
    },
    {
      label: "Pending",
      value: pendingCount,
      emoji: <img src="/pending.svg" alt="" />,
    },
    {
      label: "Completed",
      value: completedCount,
      emoji: <img src="/complete.svg" alt="" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-lg border border-gray-300 p-4 transition hover:shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">{card.label}</p>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-lg h-10 w-10">{card.emoji}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {card.value.toString().padStart(2, "0")}
          </p>
        </div>
      ))}
    </div>
  );
}
