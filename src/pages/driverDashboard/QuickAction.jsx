import { useNavigate } from "react-router-dom";

export default function QuickAction({ label, icon, badge }) {
  const navigate = useNavigate();

  let path = "";
  switch (label) {
    case "View Ride Requests":
      path = "/driver/dashboard/11/ride-requests";
      break;
    case "View Earnings":
      path = "/driver/dashboard/11/earnings";
      break;
    case "Manage Vehicle":
      path = "/driver/dashboard/11/manage-vehicle";
      break;
    default:
      path = "/driver/dashboard";
  }

  return (
    <div className="flex items-center justify-between border px-4 py-2 rounded hover:bg-gray-50 cursor-pointer w-11/12 mx-auto">
      <button
        onClick={() => navigate(path)}
        className="flex items-center gap-2 w-full"
      >
        <span className="font-medium flex items-center justify-between w-full mx-2">
          <span className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </span>
          {badge && (
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
