export default function StatCard({ label, value, icon, subtext }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2 ">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-night-ink">{icon}</div>
      </div>
      <div className="text-sm text-gray-500">{subtext}</div>
    </div>
  );
}
