import { formatOrdinal } from './formatOrdinal';

export function formatDueDate(isoDate: string): string {
  const today = new Date();
  const due = new Date(isoDate);

  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const dueUTC = Date.UTC(due.getUTCFullYear(), due.getUTCMonth(), due.getUTCDate());
  const diffDays = (dueUTC - todayUTC) / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';

  const day = formatOrdinal(due.getUTCDate());
  const month = due.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' });
  const year = due.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
