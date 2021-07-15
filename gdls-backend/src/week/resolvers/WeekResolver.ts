import {Arg, Ctx, ID, Info, Mutation, Query, Resolver} from 'type-graphql';

import {Week} from '../models/Week';

import {IRequestContext} from '../../shared/IRequestContext';
import {EntityId} from "../../shared/EntityId";
import {closeActiveWeek} from "../services/close-active-week";
import {closeWeek} from '../services/close-week';
import {UserRole} from "../../user/enums/UserRole";
import {importWeek} from "../services/import-week";

@Resolver(Week)
export class WeekResolver {
  @Query(() => Week)
  async activeWeek(@Info() info, @Ctx() ctx: IRequestContext) {
    return await ctx.em.findOne(Week, { where: { isActive: true } })
  }

  @Query(() => Week)
  async lastRoundsWeek(@Info() info, @Ctx() ctx: IRequestContext) {
    const activeWeek = await ctx.em.findOne(Week, { where: { isActive: true } });
    if (!activeWeek) {
      throw new Error('No active week');
    }
    const activeWeekRounds = await activeWeek.rounds;
    if (activeWeekRounds.length > 0) {
      return activeWeek;
    }
    const lastRoundsWeek = await ctx.em.findOne(Week, { where: { id: activeWeek.id - 1 } });
    return lastRoundsWeek;
  }

  @Mutation(() => Boolean)
  async closeWeek(@Arg('id', () => ID) id: EntityId, @Ctx() ctx: IRequestContext) {
    const user = await ctx.user;
    if (!user) {
      throw new Error('Not authenticated');
    }
    if (user.role !== UserRole.ADMIN) {
      throw new Error('User must be admin');
    }
    const week = await ctx.em.findOneOrFail(Week, id);
    await ctx.em.transaction(async t => closeWeek(week, t));

    return true;
  }

  @Mutation(() => Boolean)
  async closeActiveWeek(@Ctx() ctx: IRequestContext) {
    const user = await ctx.user;
    if (!user) {
      throw new Error('Not authenticated');
    }
    if (user.role !== UserRole.ADMIN) {
      throw new Error('User must be admin');
    }

    const week = await ctx.activeWeek;
    if (!week) {
      throw new Error('Missing active week');
    }
    await ctx.em.transaction(async t => closeActiveWeek(week, t));

    return true;
  }

  @Mutation(() => Boolean)
  async importWeek(@Arg('name') name: string, @Arg('weekNumber') weekNumber: number, @Ctx() ctx: IRequestContext) {
    const activeYear = await ctx.activeYear;
    if (!activeYear) {
      throw new Error('No active year');
    }
    await ctx.em.transaction(async em => importWeek(em, name, weekNumber, activeYear));
    return true;
  }
}
