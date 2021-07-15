import _ from 'lodash';
import {Round} from "../models/Round";

export async function isWinningRound(round: Round) {
  const week = await round.week;
  const year = await week.year;
  if (week.isActive || !year.isActive) {
    return false;
  }

  const maxScore = _.max((await week.rounds).map(round => round.score));

  return maxScore === round.score;
}
