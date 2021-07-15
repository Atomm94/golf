import {Arg, Ctx, Mutation} from "type-graphql";
import axios from 'axios';
import csv from 'csvtojson';
import {IRequestContext} from "../../shared/IRequestContext";
import {User} from "../models/User";
import {UserRole} from "../enums/UserRole";
import {hashPassword} from "../../authentication/crypto";

interface IRowTYpe {
  NAME: string;
  HANDICAP: string;
  email: string;
  nationality: string;
}

export class UserResolver {
  @Mutation(() => Boolean)
  async importUsersCsv(@Arg('csvUrl') csvUrl: string, @Ctx() ctx: IRequestContext) {
    const { data } = await axios.get<string>(csvUrl);
    const peopleData = await csv().fromString(data) as IRowTYpe[];

    for (const personData of peopleData) {
      const { HANDICAP, nationality, NAME } = personData;
      if (!personData.email) {
        continue;
      }
      const email = personData.email.trim();
      const newUser = new User();
      newUser.location = 'MEXICO';
      const user = await ctx.em.findOne(User, { email }) || newUser;

      const [firstName, ...lastNameWords] = NAME.split(' ');
      const lastName = lastNameWords.join(' ');

      user.firstName = user.firstName || firstName;
      user.lastName = user.lastName || lastName;
      user.role = UserRole.USER;
      user.money = user.money || 0;
      user.passwordHash = user.passwordHash || await hashPassword('password');
      user.email = user.email || email;
      const handicap = parseInt(HANDICAP);
      user.handicap = handicap === undefined ? user.handicap : handicap;
      if (nationality) {
        user.location = nationality;
      }
      await ctx.em.save(user);
    }

    return true;
  }
}
