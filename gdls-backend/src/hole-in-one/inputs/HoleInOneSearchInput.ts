/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { ReferenceSearchInput } from '../../shared/ReferenceSearchInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class HoleInOneSearchInput {
  @Field(() => EntityIdScalar, {"nullable":true})
  public id?: EntityId;

  @Field(() => Date, {"nullable":true})
  public date?: Date | null;

  @Field(() => String, {"nullable":true})
  public courseName?: string | null;

  @Field(() => Number, {"nullable":true})
  public holeNumber?: number | null;

  @Field(() => Number, {"nullable":true})
  public yardage?: number | null;

  @Field(() => ReferenceSearchInput, {"nullable":true})
  public club?: ReferenceSearchInput | null;

  @Field(() => ReferenceSearchInput, {"nullable":true})
  public winner?: ReferenceSearchInput | null;

  // <keep-methods>
  // </keep-methods>
}
