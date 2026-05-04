const Header = ({ title, totalTasks, completedTasks }: { title: string; totalTasks: number; completedTasks: number }) => {
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-400">
        Today is {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ backgroundColor: '#ffa607', width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{completedTasks}/{totalTasks} done</span>
        </div>

    </div>
  );
};

export default Header;
