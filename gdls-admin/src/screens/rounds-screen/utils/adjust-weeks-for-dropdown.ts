import { sortBy, reverse } from 'lodash';

interface IWeek {
  id: string;
  weekNumber: number;
  isActive: boolean;
  year: {
    id: string;
    year: number;
  };
}

export const adjustWeeksForDropdown = (weeks: IWeek[]) => {
  const sortedArray = sortBy(weeks, ['year.year', 'weekNumber']);
  const reversedArray = reverse(sortedArray);
  return reversedArray.map(week => ({
    value: week.id,
    label: `week ${week.weekNumber} (${week.year.year})`
  }));
};
