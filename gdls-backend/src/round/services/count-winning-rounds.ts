import {User} from "../../user/models/User";
import bluebird from "bluebird";
import {isWinningRound} from "./is-winning-round";

export async function countWinningRounds(user: User) {
  const allWinningRounds = await bluebird.filter(await user.rounds, isWinningRound);
  return allWinningRounds.length;
}
