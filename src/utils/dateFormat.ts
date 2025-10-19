export const formatRelativeTime = (isoDate: string | null | undefined): string => {
  if (!isoDate) {
    return 'Unknown';
  }

  const value = new Date(isoDate);
  if (Number.isNaN(value.getTime())) {
    return 'Unknown';
  }

  const now = new Date();
  const diffMs = value.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (Math.abs(diffMinutes) < 1) {
    return 'Just now';
  }

  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffMinutes) < 60) {
    return diffMinutes > 0 ? `In ${diffMinutes} min` : `${Math.abs(diffMinutes)} min ago`;
  }

  if (Math.abs(diffHours) < 24) {
    return diffHours > 0 ? `In ${diffHours} hr` : `${Math.abs(diffHours)} hr ago`;
  }

  return diffDays > 0 ? `In ${diffDays} days` : `${Math.abs(diffDays)} days ago`;
};

export const formatDate = (isoDate: string, options?: Intl.DateTimeFormatOptions): string => {
  try {
    return new Intl.DateTimeFormat('en-US', options ?? { month: 'short', day: 'numeric', year: 'numeric' }).format(
      new Date(isoDate)
    );
  } catch {
    return isoDate;
  }
};
