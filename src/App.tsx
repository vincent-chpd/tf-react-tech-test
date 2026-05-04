// src/App.tsx
// This is your starting point. Build out the UI here.
// You're welcome to split this into multiple components if you'd like!

import { useState, useEffect, useMemo } from 'react';
import { Task, Priority, CompletedFilter, TaskFormValues } from './types';
import { getTasks, updateTask, deleteTask, createTask } from './api';
import { Button } from '@headlessui/react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import TaskFormModal from './components/TaskFormModal';
import ProgressBar from './components/ProgressBar';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | ''>('');

  useEffect(() => {
    void (async () => {
      try {
        const completed = completedFilter === 'all' ? undefined : completedFilter === 'done';
        const data = await getTasks({ priority: priorityFilter, completed });
        setTasks(data);
      } catch {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    })();
  }, [completedFilter, priorityFilter]);

  const handleToggleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
  };

  const handleUpdateTask = async (id: string, updates: { title: string; priority?: Priority }) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCreateTask = async ({ title, priority }: TaskFormValues ) => {
    const task = await createTask({ title, completed: false, priority });
    setTasks((prev) => [...prev, task]);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-4">
      <div className="flex flex-col max-w-3xl mx-auto gap-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white rounded-2xl shadow-sm px-4 sm:px-8 py-6">
          <Header title="Hello, Jonny! 👋" />
          <Button
            className="rounded-md px-4 py-2 cursor-pointer font-medium text-sm bg-amber-400 text-gray-900 hover:bg-amber-500 focus:outline-none"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            + Add New Task
          </Button>
        </div>
        <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-sm px-4 sm:px-8 py-6">
          <div className="flex flex-col justify-between gap-1">
            <h2 className="text-2xl font-bold">My Tasks</h2>
            <ProgressBar tasks={tasks}/>
          </div>

          <FilterBar
            completedFilter={completedFilter}
            priorityFilter={priorityFilter}
            onCompletedFilterChange={setCompletedFilter}
            onPriorityFilterChange={setPriorityFilter}
          />

          {tasks.length === 0 ? (
            <p>No tasks yet. Add one above!</p>
          ) : (
            <ul className="list-none p-0">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleToggleComplete={handleToggleComplete}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <TaskFormModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Add a new task"
        submitLabel="Add task"
        onSubmit={handleCreateTask}
      />
    </div>
  );
}

export default App;
