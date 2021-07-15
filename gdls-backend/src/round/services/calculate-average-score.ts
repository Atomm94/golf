import bluebird from 'bluebird';
import {User} from "../../user/models/User";
import { isFinishedRound } from './is-finished-round';

export async function calculateAverageScore(user: User) {
  const allFinishedRounds = await bluebird.filter(await user.rounds, isFinishedRound);
  if (allFinishedRounds.length === 0) {
    return 0;
  }
  const totalScore = allFinishedRounds.reduce((sum, round) => round.score + sum, 0);
  return totalScore / allFinishedRounds.length;
}
