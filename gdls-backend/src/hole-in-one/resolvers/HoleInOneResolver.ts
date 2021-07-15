import {Ctx, FieldResolver, Resolver, Root} from 'type-graphql';
import _ from 'lodash';

import { HoleInOne } from '../models/HoleInOne';
import {IRequestContext} from "../../shared/IRequestContext";

@Resolver(HoleInOne)
export class HoleInOneResolver {
  @FieldResolver(() => Number)
  async totalAmountPaid(@Root() holeInOne: HoleInOne, @Ctx() ctx: IRequestContext) {
    const paymentObligations = await holeInOne.paymentObligations;
    const completedPaymentsAmounts = paymentObligations.map(obligation => obligation.didPay ? obligation.amountToPay : 0);

    return _.sum(completedPaymentsAmounts);
  }
}
