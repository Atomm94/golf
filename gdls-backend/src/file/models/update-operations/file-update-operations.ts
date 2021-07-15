/* eslint-disable @typescript-eslint/no-unused-vars */
/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { asPromise } from '../../../shared/as-promise';
import { IRequestContext } from '../../../shared/IRequestContext';
import { File } from '../../../file/models/File';
import { UserNestedInput } from '../../../user/inputs/UserNestedInput';
import { User } from '../../../user/models/User';

export async function updateUserRelation(file: File, user: UserNestedInput | null | undefined, context: IRequestContext) {
  const existingUser = await file.user;

  if (user === null) {
    file.user = Promise.resolve(null);
  } else if (user === undefined) {
    // do nothing
  } else if (user.id) {
    const userModel = await context.em.findOneOrFail(User, user.id);
    file.user = asPromise(await userModel.update(user, context));
  } else if (existingUser) {
    await existingUser.update(user, context);
  } else {
    file.user = asPromise(await new User().update(user, context));
  }
}

export async function updateDumbHatUserRelation(file: File, dumbHatUser: UserNestedInput | null | undefined, context: IRequestContext) {
  const existingDumbHatUser = await file.dumbHatUser;

  if (dumbHatUser === null) {
    file.dumbHatUser = Promise.resolve(null);
  } else if (dumbHatUser === undefined) {
    // do nothing
  } else if (dumbHatUser.id) {
    const dumbHatUserModel = await context.em.findOneOrFail(User, dumbHatUser.id);
    file.dumbHatUser = asPromise(await dumbHatUserModel.update(dumbHatUser, context));
  } else if (existingDumbHatUser) {
    await existingDumbHatUser.update(dumbHatUser, context);
  } else {
    file.dumbHatUser = asPromise(await new User().update(dumbHatUser, context));
  }
}

