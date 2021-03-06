/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { UserNestedInput } from '../../user/inputs/UserNestedInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class BetsGroupNestedInput {
  @Field(() => EntityIdScalar, {"nullable":true})
  public id?: EntityId;

  @Field(() => String, {"nullable":true})
  public name?: string | null;

  @Field(() => UserNestedInput, {"nullable":true})
  public user?: UserNestedInput | null;

  // <keep-methods>
  // </keep-methods>
}
