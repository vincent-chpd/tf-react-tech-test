import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Select } from '@headlessui/react'
import { Pencil, Trash2 } from 'lucide-react';
import { Task, Priority } from '../types';
import DeleteConfirmModal from './DeleteConfirmModal';

const PRIORITY_CONFIG = {
  high:   { dot: 'bg-red-500',    badge: 'bg-red-50 text-red-700 ring-red-600/20' },
  medium: { dot: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  low:    { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
};

const TaskCard = ({ task, handleToggleComplete, handleDeleteTask, handleUpdateTask }: {
  task: Task;
  handleToggleComplete: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
  handleUpdateTask: (id: string, updates: { title: string; priority?: Priority }) => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState<Priority | ''>('');

  const openEditModal = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority ?? '');
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    handleUpdateTask(task.id, { title: editTitle, priority: editPriority || undefined });
    setIsEditModalOpen(false);
  };

  const priority = task.priority ? PRIORITY_CONFIG[task.priority] : null;

  return (
    <>
      <li className={`group flex items-center gap-3 px-4 py-3 mb-2 rounded-xl border bg-white shadow-sm ${task.completed ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:shadow-md hover:border-gray-300'}`}>
        <button
          onClick={() => handleToggleComplete(task)}
          className="shrink-0 w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            backgroundColor: task.completed ? '#ffa607' : 'transparent',
            borderColor: task.completed ? '#ffa607' : undefined,
            ['--tw-ring-color' as string]: '#ffa60766',
          }}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
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
            {{ low: 'Low', medium: 'Med', high: 'High' }[task.priority!]}
          </span>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={openEditModal}
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

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        taskTitle={task.title}
        onConfirm={() => { setIsDeleteModalOpen(false); handleDeleteTask(task.id); }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <Dialog open={isEditModalOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsEditModalOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6 duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                Edit task
              </DialogTitle>

              <Field className="flex flex-col gap-3 mt-4">
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="What needs to be done?"
                  className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
                <Select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as Priority | '')}
                  className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                >
                  <option value="">No priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Med</option>
                  <option value="high">High</option>
                </Select>
              </Field>`
              <div className="mt-5 flex gap-2 justify-end">
                <Button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition-colors focus:outline-none disabled:opacity-50"
                  onClick={handleSave}
                  disabled={!editTitle.trim()}
                >
                  Save changes
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TaskCard
