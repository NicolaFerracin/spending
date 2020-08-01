export const formatDateForInput = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};

const capitalizeWord = string => !!string && `${string[0].toUpperCase()}${string.substring(1)}`;
export const capitalize = sentence =>
  sentence
    .split(' ')
    .map(capitalizeWord)
    .join(' ');
