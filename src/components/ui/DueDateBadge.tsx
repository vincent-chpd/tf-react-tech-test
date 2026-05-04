import { Calendar } from 'lucide-react';
import { Task } from '../../types';
import { formatDueDate } from '../../utils/formatDueDate';

const DueDateBadge = ({ task }: { task: Task }) => {
  return (
    <>
      {task.dueDate && (
        <span className={`inline-flex items-center bg-gray-100 px-4 py-1 rounded-full gap-1 text-xs ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar className="w-3 h-3" />
          {formatDueDate(task.dueDate)}
        </span>
      )}
    </>
  )
}

export default DueDateBadge
