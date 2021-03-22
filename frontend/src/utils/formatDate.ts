import formatDistance from 'date-fns/formatDistance';

export const formatDate = (date: number): string => {
  const convertDate = new Date(date);
  return formatDistance (
    convertDate,
    new Date()
  );
};
