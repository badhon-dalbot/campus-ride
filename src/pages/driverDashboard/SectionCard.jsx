export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <h2 className="font-bold text-lg mb-4 w-container mx-auto">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
