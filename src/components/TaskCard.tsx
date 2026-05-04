import { useState } from 'react'
import { Button } from '@headlessui/react'
import { Pencil, Trash2 } from 'lucide-react';
import { Priority, TaskCardProps } from '../types';
import DeleteConfirmModal from './DeleteConfirmModal';
import TaskFormModal from './TaskFormModal';
import PriorityBadge from './ui/PriorityBadge';
import DueDateBadge from './ui/DueDateBadge';
import TaskCheckbox from './TaskCheckbox';

const TaskCard = ({ task, handleToggleComplete, handleDeleteTask, handleUpdateTask }: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleTaskFormSubmit = async (values: { title: string; priority?: Priority; dueDate?: string }) => {
    await handleUpdateTask(task.id, values);
    setIsEditModalOpen(false);
  }

  const handleConfirmDelete = () => {
    handleDeleteTask(task.id);
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <li className={`group flex items-center gap-3 px-4 py-3 mb-2 rounded-xl border bg-white shadow-sm ${task.completed ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:shadow-md hover:border-gray-300'}`}>
        <TaskCheckbox checked={task.completed} onChange={() => handleToggleComplete(task)} />

        <span className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </span>

        <div className="flex items-center gap-2 ">
          <DueDateBadge task={task}/>
          <PriorityBadge task={task} />
        </div>

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
        initialValues={{ title: task.title, priority: task.priority, dueDate: task.dueDate?.slice(0, 10) }}
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
