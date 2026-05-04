import React, { useMemo } from 'react'
import { Task } from '../../types';

const PriorityBadge = ({ task }: { task: Task }) => {

  const priority = useMemo( () => {
    switch (task.priority) {
      case 'high':
        return {
          dot: 'bg-red-500',
          badge: 'bg-red-50 text-red-700 ring-red-600/20',
          title: 'High'
        }
      case 'medium':
        return {
          dot: 'bg-amber-400',
          badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
          title: 'Med'
        };
      case 'low':
        return {
          dot: 'bg-emerald-500',
          badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
          title: 'Low'
        };
      default:
        return '';
    }
  }, [task.priority]);

  return (
    <>
      {priority && (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${priority.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {priority.title}
        </span>
      )}
    </>
  )
}

export default PriorityBadge
