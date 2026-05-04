import { useMemo, useState } from 'react'
import { Button } from '@headlessui/react'
import { Pencil, Trash2 } from 'lucide-react';
import { Priority, TaskCardProps } from '../types';
import DeleteConfirmModal from './DeleteConfirmModal';
import TaskFormModal from './TaskFormModal';

const TaskCard = ({ task, handleToggleComplete, handleDeleteTask, handleUpdateTask }: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleTaskFormSubmit = async (values: { title: string; priority?: Priority }) => {
    await handleUpdateTask(task.id, values);
    setIsEditModalOpen(false);
  }

  const handleConfirmDelete = () => {
    handleDeleteTask(task.id);
    setIsDeleteModalOpen(false);
  }

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
      <li className={`group flex items-center gap-3 px-4 py-3 mb-2 rounded-xl border bg-white shadow-sm ${task.completed ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:shadow-md hover:border-gray-300'}`}>
        <button
          onClick={() => handleToggleComplete(task)}
          className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center transition-colors focus:outline-none"
          style={{
            backgroundColor: task.completed ? '#ffa607' : 'transparent',
            borderColor: task.completed ? '#ffa607' : undefined,
          }}
          aria-label={task.completed ? 'Task incomplete' : 'Task complete'}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <span className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </span>

        {priority && (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${priority.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.title}
          </span>
        )}

        <div className="flex items-center gap-1">
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Edit task"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </li>

      <TaskFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit task"
        submitLabel="Save changes"
        initialValues={{ title: task.title, priority: task.priority }}
        onSubmit={handleTaskFormSubmit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        taskTitle={task.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default TaskCard
