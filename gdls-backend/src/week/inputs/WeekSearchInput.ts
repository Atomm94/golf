/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { ReferenceSearchInput } from '../../shared/ReferenceSearchInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class WeekSearchInput {
  @Field(() => EntityIdScalar, {"nullable":true})
  public id?: EntityId;

  @Field(() => Number, {"nullable":true})
  public weekNumber?: number | null;

  @Field(() => Boolean, {"nullable":true})
  public isActive?: boolean | null;

  @Field(() => ReferenceSearchInput, {"nullable":true})
  public year?: ReferenceSearchInput | null;

  // <keep-methods>
  // </keep-methods>
}
