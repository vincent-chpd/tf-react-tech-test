type TaskCheckboxProps = {
  checked: boolean;
  onChange: () => void;
};

const TaskCheckbox = ({ checked, onChange }: TaskCheckboxProps) => (
  <button
    onClick={onChange}
    className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center transition-colors focus:outline-none"
    style={{
      backgroundColor: checked ? '#ffa607' : 'transparent',
      borderColor: checked ? '#ffa607' : undefined,
    }}
    aria-label={checked ? 'Mark as incomplete' : 'Mark as complete'}
  >
    {checked && (
      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

export default TaskCheckbox;
