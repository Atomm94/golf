/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { BetsGroupNestedInput } from '../../bets-group/inputs/BetsGroupNestedInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class BetCreateInput {
  @Field(() => Date, )
  public date: Date;

  @Field(() => Number, )
  public amount: number;

  @Field(() => String, )
  public course: string;

  @Field(() => Number, {"nullable":true})
  public currentAdvantage?: number | null;

  @Field(() => Number, {"nullable":true})
  public nextAdvantage?: number | null;

  @Field(() => BetsGroupNestedInput, )
  public betsGroup: BetsGroupNestedInput;

  // <keep-methods>
  // </keep-methods>
}