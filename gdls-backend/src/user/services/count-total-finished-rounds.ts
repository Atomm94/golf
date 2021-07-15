import bluebird from 'bluebird';
import {User} from "../models/User";
import {isFinishedRound} from "../../round/services/is-finished-round";

export async function countTotalFinishedRounds(user: User) {
  const allFinishedRounds = await bluebird.filter(await user.rounds, isFinishedRound);
  return allFinishedRounds.length;
}
