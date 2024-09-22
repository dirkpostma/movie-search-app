export const formatDate = (dateString?: string) => {
  return dateString ? new Date(dateString).toDateString() : 'Unknown';
};
