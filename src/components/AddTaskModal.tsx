import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Select } from '@headlessui/react';
import { Task } from '../types';
import { createTask } from '../api';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (task: Task) => void;
}

export default function AddTaskModal({ isOpen, onClose, onTaskAdded }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority'] | ''>('');
  const [errors, setErrors] = useState<{ title?: string; priority?: string }>({});

  const handleSubmit = async () => {
    const newErrors: { title?: string; priority?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const task = await createTask({ title, completed: false, priority: priority as Task['priority'] });
    onTaskAdded(task);
    setTitle('');
    setPriority('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white shadow-lg border border-gray-200 p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
              Add a new task
            </DialogTitle>

            <Field className="flex flex-col mt-4">
              <Input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })); }}
                placeholder="What needs to be done?"
                className={`border p-2 mt-1 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              <Select
                value={priority}
                onChange={(e) => { setPriority(e.target.value as Task['priority'] | ''); setErrors((prev) => ({ ...prev, priority: undefined })); }}
                className={`border p-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand ${errors.priority ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Med</option>
                <option value="high">High</option>
              </Select>
              {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
            </Field>

            <div className="mt-4 flex gap-2 justify-end">
              <Button
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus:outline-none"
                style={{ backgroundColor: '#ffa607', color: '#000' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e69400')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffa607')}
                onClick={handleSubmit}
              >
                Add task
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
