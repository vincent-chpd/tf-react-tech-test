// src/types.ts
// These are your core types. Feel free to extend them as needed!

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: Priority; // Bonus field - optional
}

// Used when creating a new task (no id or createdAt yet)
export type NewTask = Omit<Task, 'id' | 'createdAt'>;

// Used when updating a task
export type UpdateTask = Partial<Omit<Task, 'id' | 'createdAt'>>;

export type CompletedFilter = 'all' | 'active' | 'done';

export interface FilterBarProps {
  completedFilter: CompletedFilter;
  priorityFilter: Priority | '';
  onCompletedFilterChange: (filter: CompletedFilter) => void;
  onPriorityFilterChange: (priority: Priority | '') => void;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TaskFormValues {
  title: string;
  priority?: Priority;
}

export interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  title: string;
  submitLabel: string;
  initialValues?: TaskFormValues;
}

export interface TaskCardProps {
  task: Task;
  handleToggleComplete: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
  handleUpdateTask: (id: string, updates: { title: string; priority?: Priority }) => Promise<void>;
}
