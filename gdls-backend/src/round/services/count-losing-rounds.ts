import bluebird from "bluebird";
import {isLosingRound} from "./is-losing-round";
import {User} from "../../user/models/User";

export async function countLosingRounds(user: User) {
  const allLosingRounds = await bluebird.filter(await user.rounds, isLosingRound);
  return allLosingRounds.length;
}
