import { Select } from '@headlessui/react';
import { FilterBarProps, CompletedFilter, Priority } from '../types';

const TABS: { label: string; value: CompletedFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Done', value: 'done' },
];

const FilterBar = ({ completedFilter, priorityFilter, onCompletedFilterChange, onPriorityFilterChange }: FilterBarProps) => {
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPriorityFilterChange(e.target.value as Priority);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex bg-gray-100 p-1 rounded-lg gap-0.5">
        {TABS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onCompletedFilterChange(value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
              completedFilter === value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Select
        value={priorityFilter}
        onChange={handlePriorityChange}
        className="border border-gray-200 bg-white px-3 py-1.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent cursor-pointer"
      >
        <option value="">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>
    </div>
  );
};

export default FilterBar;
