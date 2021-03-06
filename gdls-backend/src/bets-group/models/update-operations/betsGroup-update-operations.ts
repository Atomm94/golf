/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { asPromise } from '../../../shared/as-promise';
import { IRequestContext } from '../../../shared/IRequestContext';
import { BetsGroup } from '../../../bets-group/models/BetsGroup';
import { UserNestedInput } from '../../../user/inputs/UserNestedInput';
import { User } from '../../../user/models/User';

export async function updateUserRelation(betsGroup: BetsGroup, user: UserNestedInput | null | undefined, context: IRequestContext) {
  const existingUser = await betsGroup.user;

  if (user === null) {
    throw new Error('BetsGroup.user cannot be null')
  } else if (user === undefined) {
    // do nothing
  } else if (user.id) {
    const userModel = await context.em.findOneOrFail(User, user.id);
    betsGroup.user = asPromise(await userModel.update(user, context));
  } else if (existingUser) {
    await existingUser.update(user, context);
  } else {
    betsGroup.user = asPromise(await new User().update(user, context));
  }
}

