function StatCard({ title, value, icon, color }) {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 dark:text-slate-300 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{value}</h2>
        </div>

        <div className={`p-4 rounded-3xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;