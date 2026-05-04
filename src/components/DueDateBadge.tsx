import { Calendar } from 'lucide-react';
import { Task } from '../types'

const DueDateBadge = ({ task }: { task: Task }) => {
  return (
    <>
      {task.dueDate && (
        <span className={`inline-flex items-center bg-gray-100 px-4 py-1 rounded-full gap-1 text-xs ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar className="w-3 h-3" />
          {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}
        </span>
      )}
    </>
  )
}

export default DueDateBadge
