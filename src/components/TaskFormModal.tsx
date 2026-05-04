import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Select } from '@headlessui/react';
import { Priority, TaskFormModalProps } from '../types';
import { CalendarDays } from 'lucide-react';
import { ListTodo } from 'lucide-react';

const TaskFormModal = ({ isOpen, onClose, onSubmit, title, submitLabel, initialValues }: TaskFormModalProps) => {
  const [taskTitle, setTaskTitle] = useState<string | undefined>(initialValues?.title);
  const [priority, setPriority] = useState<Priority | undefined>(initialValues?.priority);
  const [dueDate, setDueDate] = useState<string | undefined>(initialValues?.dueDate);
  const [errors, setErrors] = useState<{ title?: string; priority?: string; dueDate?: string } | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTaskTitle(initialValues?.title);
      setPriority(initialValues?.priority);
      setDueDate(initialValues?.dueDate);
      setErrors(undefined);
    }
  }, [isOpen, initialValues?.title, initialValues?.priority, initialValues?.dueDate]);

  const handleClose = () => {
    setTaskTitle(undefined);
    setPriority(undefined);
    setDueDate(undefined);
    setErrors(undefined);
    onClose();
  };

  const handleSubmit = async () => {
    const newErrors: { title?: string; priority?: string; dueDate?: string } = {};
    if (!taskTitle?.trim()) newErrors.title = 'Title is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (!dueDate ) newErrors.dueDate = 'Due date is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ title: taskTitle?.trim() || '', priority, dueDate: dueDate || undefined });
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectPriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
    if (errors?.priority) setErrors((prev) => ({ ...prev, priority: undefined }));
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
    if (errors?.title) setErrors((prev) => ({ ...prev, title: undefined }));
  }

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    if (errors?.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }));
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6 duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
              <div className="flex gap-2 items-center">
                <ListTodo className="text-amber-500 bg-amber-50 p-2 rounded-full h-10 w-10"/>
                {title}
              </div>
            </DialogTitle>

            <Field className="flex flex-col gap-3 mt-4">
              <div>
                <Input
                  type="text"
                  value={taskTitle}
                  onChange={handleTitleChange}
                  placeholder="What needs to be done?"
                  className={`w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${errors?.title ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors?.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>
              <div>
                <Select
                  value={priority}
                  onChange={handleSelectPriority}
                  className={`w-full border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white ${errors?.priority ? 'border-red-400' : 'border-gray-200'}`}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
                {errors?.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
              </div>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <Input
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  className="w-full border border-gray-200 pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-700"
                />
                {errors?.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
              </div>
            </Field>

            <div className="mt-5 flex gap-2 justify-end">
              <Button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="px-4 py-2 text-sm font-medium bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-500 transition-colors focus:outline-none disabled:opacity-50"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitLabel}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default TaskFormModal
