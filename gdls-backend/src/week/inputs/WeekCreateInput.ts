/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../../shared/EntityId';

// <keep-imports>
// </keep-imports>

@InputType()
export class WeekCreateInput {
  @Field(() => Number, )
  public weekNumber: number;

  @Field(() => Boolean, )
  public isActive: boolean;

  // <keep-methods>
  // </keep-methods>
}
