// src/App.tsx
// This is your starting point. Build out the UI here.
// You're welcome to split this into multiple components if you'd like!

import { useState, useEffect } from 'react';
import { Task, Priority, CompletedFilter } from './types';
import { getTasks, updateTask, deleteTask } from './api';
import { Button } from '@headlessui/react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';

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
        const data = await getTasks({ priority: priorityFilter || undefined, completed });
        setTasks(data);
      } catch {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    })();
  }, [completedFilter, priorityFilter]);

  // TODO: Expand this if you add extra fields to update
  const handleToggleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleUpdateTask = async (id: string, updates: { title: string; priority?: Task['priority'] }) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // TODO: Add a confirmation step, or an undo feature if you like!
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };


  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="min-h-screen py-12 px-4">
    <div className="flex flex-col max-w-3xl mx-auto gap-3">

      <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm px-8 py-6">
        <Header
          title={'Good Morning, Jonny! 👋'}
          totalTasks={tasks.length}
          completedTasks={tasks.filter((t) => t.completed).length}
        />
        <Button
          className="rounded-md px-4 py-2 cursor-pointer font-medium text-sm"
          style={{ backgroundColor: '#ffa607', color: '#000' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e69400')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffa607')}
          onClick={ () => {setIsAddTaskModalOpen(true)} }
        >
          + Add New Task
        </Button>
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          onTaskAdded={(task) => setTasks((prev) => [...prev, task])}
        />
      </div>

    <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-sm px-8 py-6">

      <h2 className="text-2xl font-bold">My Tasks</h2>



      <div>
        <FilterBar
          completedFilter={completedFilter}
          priorityFilter={priorityFilter}
          onCompletedFilterChange={setCompletedFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
      </div>

      {/* TODO: Style this list — make it your own! */}
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} handleToggleComplete={handleToggleComplete} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask} />
          ))}
        </ul>
      )}
      </div>
    </div>
    </div>
  );
}

export default App;
