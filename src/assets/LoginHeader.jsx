import { MapPin } from "lucide-react";

export default function LoginHeader() {
  return (
    <header className="bg-gray-800 p-4 flex justify-center">
      <div className="flex items-center text-teal-400">
        <MapPin className="mr-2" />
        <span className="font-bold text-xl">CAMPUS RIDE</span>
      </div>
    </header>
  );
}