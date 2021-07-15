import bluebird from 'bluebird';
import {User} from "../../user/models/User";
import {isFinishedRound} from "./is-finished-round";
import {countLosingRounds} from "./count-losing-rounds";

export async function countLosingPercentage(user: User) {
  const allFinishedRounds = await bluebird.filter(await user.rounds, isFinishedRound);
  const result = await countLosingRounds(user) / allFinishedRounds.length;
  return (isFinite(result) ? result : 0) * 100;
}
