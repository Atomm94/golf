import {Round} from "../models/Round";

export async function isFinishedRound(round: Round) {
  const week = await round.week;
  const year = await week.year;
  if (week.isActive || !year.isActive) {
    return false;
  }
  return true;
}
