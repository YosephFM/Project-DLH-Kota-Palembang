function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;