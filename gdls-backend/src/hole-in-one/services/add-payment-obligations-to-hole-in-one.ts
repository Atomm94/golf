import {HoleInOne} from "../models/HoleInOne";
import {User} from "../../user/models/User";
import {HoleInOnePaymentObligation} from "../../hole-in-one-payment-obligation/models/HoleInOnePaymentObligation";
import {IRequestContext} from "../../shared/IRequestContext";

export async function addPaymentObligationsToHoleInOne(ctx: IRequestContext, holeInOne: HoleInOne) {
  const winner = await holeInOne.winner;
  const usersWithPayingObligation = (await ctx.em.find(User)).filter(user => user.id !== winner.id);

  const paymentObligations = usersWithPayingObligation.map(user => {
    const payingObligation = new HoleInOnePaymentObligation();
    payingObligation.userWithPaymentObligation = Promise.resolve(user);
    payingObligation.holeInOne = Promise.resolve(holeInOne);
    payingObligation.didPay = false;
    payingObligation.amountToPay = 500;
    return payingObligation;
  });

  ctx.modelsToSave.push(...paymentObligations);
}
