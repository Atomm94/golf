import _ from 'lodash';
import {Round} from "../models/Round";

export async function isLosingRound(round: Round) {
  const week = await round.week;
  const year = await week.year;
  if (week.isActive || !year.isActive) {
    return false;
  }

  const minScore = _.min((await week.rounds).map(round => round.score));

  return minScore === round.score;
}
