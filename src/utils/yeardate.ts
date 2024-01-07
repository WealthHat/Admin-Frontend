// Function to get start and end dates of a year
export const getYearDates = (year) => {
  const startYear = new Date(year, 0, 1);
  const endYear = new Date(year, 11, 31);
  return { startYear, endYear };
};
