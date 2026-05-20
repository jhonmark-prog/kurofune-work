export function formatPostedDate(postedAt: string): string {
  const now = new Date();
  const postedDate = new Date(postedAt);
  const diffInMs = now.getTime() - postedDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // average days per month
  const years = Math.floor(days / 365.25); // average days per year

  if (years > 0) {
    return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Posted just now';
  }
}