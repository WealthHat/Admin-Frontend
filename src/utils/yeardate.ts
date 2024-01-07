import { trackDates } from "./utils";

// Function to get start and end dates of a year
export const getYearDates = (year) => {
  const startYear = new Date(year, 0, 1);
  const endYear = new Date(year, 11, 31);
  return { startYear, endYear };
};

export const currentYear = () => {
  const currentYear = new Date().getFullYear();

  // Get the start and end dates of the current year
  const { startYear, endYear } = getYearDates(currentYear);
  return { startYear: trackDates(startYear), endYear: trackDates(endYear) };
};
