import dayjs from 'dayjs';

export function isSameDay(currentMessage, diffMessage) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = dayjs(currentMessage.createdAt.toDate());
  const diffCreatedAt = dayjs(diffMessage.createdAt.toDate());
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}
