interface IWeekResult {
  id: string;
  weekNumber: number;
  year: {
    id: string;
    year: number;
  }
}

interface IRoundResult {
  id: string;
  score: string;
  week: IWeekResult;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

export const filterAndAdjustRounds = (rounds: IRoundResult[], weekId: string) => {
  const filteredRounds = rounds.filter(round => round.week.id === weekId);
  return filteredRounds.map((round) => ({
    id: round.id,
    score: round.score,
    firstName: round.user.firstName,
    lastName: round.user.lastName,
    weekNumber: round.week.weekNumber,
    year: round.week.year.year,
    email: round.user.email,
  }));
};
