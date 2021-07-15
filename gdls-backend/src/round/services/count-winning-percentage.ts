import bluebird from 'bluebird';
import {User} from "../../user/models/User";
import {isFinishedRound} from "./is-finished-round";
import {countWinningRounds} from "./count-winning-rounds";

export async function countWinningPercentage(user: User) {
  const allFinishedRounds = await bluebird.filter(await user.rounds, isFinishedRound);
  const result = await countWinningRounds(user) / allFinishedRounds.length;
  return (isFinite(result) ? result : 0) * 100;
}
