export const sanitizeQuery = (query: string) => {
  const trimmedQuery = query.trim();
  return encodeURIComponent(trimmedQuery);
};
