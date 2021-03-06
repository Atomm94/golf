/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { ReferenceSearchInput } from '../../shared/ReferenceSearchInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class FileSearchInput {
  @Field(() => EntityIdScalar, {"nullable":true})
  public id?: EntityId;

  @Field(() => String, {"nullable":true})
  public contentBase64?: string | null;

  @Field(() => ReferenceSearchInput, {"nullable":true})
  public user?: ReferenceSearchInput | null;

  @Field(() => ReferenceSearchInput, {"nullable":true})
  public dumbHatUser?: ReferenceSearchInput | null;

  // <keep-methods>
  // </keep-methods>
}
