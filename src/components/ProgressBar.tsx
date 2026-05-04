import React, { useMemo } from 'react'

const ProgressBar = ({ tasks }: { tasks: any[] }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;

  const progress = useMemo(() => {
        return tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    }, [tasks.length, completedTasks]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ backgroundColor: '#ffa607', width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-400">{completedTasks}/{tasks.length} done</span>
    </div>
  )
}

export default ProgressBar
