/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { ReferenceSearchInput } from '../../shared/ReferenceSearchInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class BetSearchInput {
  @Field(() => EntityIdScalar, {"nullable":true})
  public id?: EntityId;

  @Field(() => Date, {"nullable":true})
  public date?: Date | null;

  @Field(() => Number, {"nullable":true})
  public amount?: number | null;

  @Field(() => String, {"nullable":true})
  public course?: string | null;

  @Field(() => Number, {"nullable":true})
  public currentAdvantage?: number | null;

  @Field(() => Number, {"nullable":true})
  public nextAdvantage?: number | null;

  @Field(() => ReferenceSearchInput, {"nullable":true})
  public betsGroup?: ReferenceSearchInput | null;

  // <keep-methods>
  // </keep-methods>
}
