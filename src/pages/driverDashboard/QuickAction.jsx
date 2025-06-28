export default function QuickAction({ label, icon, badge }) {
  return (
    <div className="flex items-center justify-between border px-4 py-2 rounded hover:bg-gray-50 cursor-pointer w-11/12 mx-auto">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
