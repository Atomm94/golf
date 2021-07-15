import {EntityManager} from "typeorm";
import _ from 'lodash';
import {Week} from "../models/Week";

const MONEY_PER_ROUND = 300;

export async function closeWeek(week: Week, em: EntityManager) {
  week.isActive = false;
  await em.save(week);

  const allRounds = await week.rounds;

  const allScores = allRounds.map(round => round.score);
  const bestScore = _.max(allScores) || 0;
  const secondBestScore = _.orderBy(_.uniq(allScores), undefined, 'desc')[1];

  const winningRounds = allRounds.filter(round => round.score === bestScore);
  const loosingRounds = allRounds.filter(round => round.score < bestScore);
  const secondBestRounds = allRounds.filter(round => round.score === secondBestScore);

  // step 1: remove MONEY_PER_ROUND of all loosing users
  for (const loosingRound of loosingRounds) {
    const user = await loosingRound.user;
    user.money -= MONEY_PER_ROUND;
    await em.save(user);
  }

  // case 1: More then 1 winner
  if (winningRounds.length > 1) {
    // step 2: Winners split the money that losers lost
    const moneyForWinners = loosingRounds.length * MONEY_PER_ROUND;
    const moneyPerWinner = moneyForWinners / winningRounds.length;
    for (const winningRound of winningRounds) {
      const user = await winningRound.user;
      user.money += moneyPerWinner;
      await em.save(user);
    }
    return;
  }
  // case 2: Only 1 winner
  const moneyPerSecondBest = MONEY_PER_ROUND / secondBestRounds.length;
  // step 2: Second place users get MONEY_PER_ROUND / number of second place users
  for (const secondBestRound of secondBestRounds) {
    const user = await secondBestRound.user;
    user.money += moneyPerSecondBest;
    await em.save(user);
  }
  // step 3: Winning user gets (number of winning rounds - 1) * MONEY_PER_ROUND
  for (const winningRound of winningRounds) {
    const user = await winningRound.user;
    user.money += (loosingRounds.length - 1) * MONEY_PER_ROUND;
    await em.save(user);
  }
}
