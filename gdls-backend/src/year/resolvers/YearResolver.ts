import { Ctx, Info, Query, Resolver } from 'type-graphql';

import { Year } from '../models/Year';
import { IRequestContext } from '../../shared/IRequestContext';

@Resolver(Year)
export class YearResolver {
  @Query(() => Year)
  async activeYear(@Info() info, @Ctx() ctx: IRequestContext) {
    return await ctx.em.findOne(Year, { where: { isActive: true } })
  }
}
