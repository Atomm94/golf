import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from 'type-graphql';

import { User } from '../models/User';
import { IRequestContext } from '../../shared/IRequestContext';
import {countWinningRounds} from "../../round/services/count-winning-rounds";
import {countLosingRounds} from "../../round/services/count-losing-rounds";
import {countLosingPercentage} from "../../round/services/count-losing-percentage";
import {countWinningPercentage} from "../../round/services/count-winning-percentage";
import {countTotalFinishedRounds} from "../services/count-total-finished-rounds";
import { calculateAverageScore } from '../../round/services/calculate-average-score';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  searchUsersByName(@Arg('name') name: string, @Ctx() ctx: IRequestContext) {
    return ctx.em.getRepository(User).query(
      `SELECT * FROM public.user WHERE "firstName" ILIKE '%${name}%' OR "lastName" ILIKE '%${name}%'`);
  }

  @FieldResolver(() => Number)
  async winCount(@Root() user: User) {
    return countWinningRounds(user);
  }

  @FieldResolver(() => Number)
  async loseCount(@Root() user: User) {
    return countLosingRounds(user);
  }

  @FieldResolver(() => Number)
  async losePercentage(@Root() user: User) {
    return countLosingPercentage(user);
  }

  @FieldResolver(() => Number)
  async winPercentage(@Root() user: User) {
    return countWinningPercentage(user);
  }

  @FieldResolver(() => Number)
  async finishedRoundsCount(@Root() user: User) {
    return countTotalFinishedRounds(user);
  }

  @FieldResolver(() => Number)
  async averageScore(@Root() user: User) {
    return calculateAverageScore(user);
  }
}
