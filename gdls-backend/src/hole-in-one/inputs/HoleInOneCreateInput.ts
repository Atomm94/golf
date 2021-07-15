/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

import { ClubNestedInput } from '../../club/inputs/ClubNestedInput'

// <keep-imports>
// </keep-imports>

@InputType()
export class HoleInOneCreateInput {
  @Field(() => Date, )
  public date: Date;

  @Field(() => String, )
  public courseName: string;

  @Field(() => Number, )
  public holeNumber: number;

  @Field(() => Number, )
  public yardage: number;

  @Field(() => ClubNestedInput, )
  public club: ClubNestedInput;

  // <keep-methods>
  // </keep-methods>
}