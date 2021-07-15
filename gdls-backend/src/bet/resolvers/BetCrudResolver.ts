/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Arg, Args, Mutation, Query, Info, ID, Ctx, Resolver, Root, FieldResolver, Int } from 'type-graphql';
import cleanDeep from 'clean-deep';

import { Bet } from '../models/Bet';
import { BetCreateInput } from '../inputs/BetCreateInput';
import { BetEditInput } from '../inputs/BetEditInput';
import { BetSearchInput } from '../inputs/BetSearchInput';
import { BetSearchOrderInput } from '../inputs/BetSearchOrderInput';
import { getFindOptions } from '../../shared/get-find-options';
import { EntityId, EntityIdScalar } from '../../shared/EntityId';
import { IRequestContext } from '../../shared/IRequestContext';
import * as auth from '../../authorization/auth-checkers';
import { PaginatedResponse } from '../../shared/PaginationResponse';
import { resolveGetters } from '../../shared/resolve-getters';

// <keep-imports>
// </keep-imports>

const PaginatedBetResponse = PaginatedResponse(Bet);

@Resolver(Bet)
export class BetCrudResolver {
  @Query(() => Bet)
  async bet(@Arg('id', () => EntityIdScalar) id: number, @Info() info, @Ctx() ctx: IRequestContext) {
    return await ctx.em.findOneOrFail(Bet, id, getFindOptions(Bet, info));
  }

  @Query(() => PaginatedBetResponse)
  public async searchBets(
    @Arg('search', () => BetSearchInput, { nullable: true }) search: BetSearchInput | null = null,
    @Arg('skip', () => Int, { nullable: true }) skip = 0,
    @Arg('take', () => Int, { nullable: true }) take = 25,
    @Arg('order', () => [BetSearchOrderInput], { nullable: true }) order: Array<BetSearchOrderInput> = [],
    @Info() info,
    @Ctx() ctx: IRequestContext,
  ) {
    const defaultFindOptions = getFindOptions(Bet, info, { transformQueryPath: x => x.replace(/^items./, '') });

    const [items, total] = await ctx.em.findAndCount(Bet, cleanDeep({
      ...defaultFindOptions,
      skip,
      take,
      where: resolveGetters(search),
      order: Object.assign({}, ...order),
    }));

    return {
      items,
      total,
      hasMore: skip + take < total,
    };
  }

  @Query(() => [Bet])
  async bets(@Info() info, @Ctx() ctx: IRequestContext) {
    return await ctx.em.find(Bet, getFindOptions(Bet, info));
  }

  @Mutation(() => Bet)
  async createBet(@Arg('input') input: BetCreateInput, @Ctx() ctx: IRequestContext): Promise<Bet> {
    const model = new Bet();
    await model.update(input, ctx);

    await ctx.em.save(ctx.modelsToSave);

    return model;
  }

  @Mutation(() => Bet)
  async updateBet(@Arg('input') input: BetEditInput, @Ctx() ctx: IRequestContext) {
    const model = await ctx.em.findOneOrFail(Bet, input.id);
    await model.update(input, ctx);

    // <keep-update-code>
    // </keep-update-code>

    await ctx.em.save(ctx.modelsToSave);

    return model;
  }

  @Mutation(() => Boolean)
  async deleteBets(@Arg('ids', () => [ID]) ids: Array<EntityId>, @Ctx() ctx: IRequestContext): Promise<boolean> {
    const entities = await ctx.em.findByIds(Bet, ids);
    await auth.assertCanDelete(entities, ctx);
    await ctx.em.remove(entities);

    return true;
  }

  // <keep-methods>
  // </keep-methods>
}