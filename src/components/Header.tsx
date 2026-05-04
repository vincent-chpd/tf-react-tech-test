import { formatOrdinal } from '../utils/formatOrdinal';

const Header = ({ title }: { title: string }) => {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = formatOrdinal(now.getDate());
  const monthYear = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const today = `${weekday}, ${day} ${monthYear}`;

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-400">
        {today}
      </p>
    </div>
  );
};

export default Header;
