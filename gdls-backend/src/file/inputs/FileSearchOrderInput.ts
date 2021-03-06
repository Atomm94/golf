/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { SortOrderEnum } from '../../shared/SortOrderEnum'

// <keep-imports>
// </keep-imports>

@InputType()
export class FileSearchOrderInput {
  @Field(() => SortOrderEnum, {"nullable":true})
  public id?: SortOrderEnum;

  @Field(() => SortOrderEnum, {"nullable":true})
  public contentBase64?: SortOrderEnum | null;

  @Field(() => SortOrderEnum, {"nullable":true})
  public user?: SortOrderEnum | null;

  @Field(() => SortOrderEnum, {"nullable":true})
  public dumbHatUser?: SortOrderEnum | null;

  // <keep-methods>
  // </keep-methods>
}
