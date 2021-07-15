/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { SortOrderEnum } from '../../shared/SortOrderEnum'

// <keep-imports>
// </keep-imports>

@InputType()
export class HoleInOnePaymentObligationSearchOrderInput {
  @Field(() => SortOrderEnum, {"nullable":true})
  public id?: SortOrderEnum;

  @Field(() => SortOrderEnum, {"nullable":true})
  public didPay?: SortOrderEnum | null;

  @Field(() => SortOrderEnum, {"nullable":true})
  public amountToPay?: SortOrderEnum | null;

  @Field(() => SortOrderEnum, {"nullable":true})
  public userWithPaymentObligation?: SortOrderEnum | null;

  @Field(() => SortOrderEnum, {"nullable":true})
  public holeInOne?: SortOrderEnum | null;

  // <keep-methods>
  // </keep-methods>
}