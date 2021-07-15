import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';

import { IToken } from '../authorization/IToken';
import { IRequestContext } from '../shared/IRequestContext';
import { User } from '../user/models/User';
import config from './config';
import {Week} from "../week/models/Week";
import {Year} from "../year/models/Year";

export function createGraphqlContext(context: IRequestContext): IRequestContext {
  const { request, response } = context;
  const connection = getConnection();
  const em = connection.manager;
  const activeWeek = em.findOne(Week, { where: { isActive: true } });
  const activeYear = em.findOne(Year, { where: { isActive: true } });
  const ret: IRequestContext = { request, response, em, modelsToSave: [], activeWeek, activeYear };
  const token = request.headers.token || request.headers.Authorization || request.cookies.token;
  if (!token) {
    console.log('mtav',request.cookies);
    return ret;
  }
  try {
    const auth = jwt.verify(token, config.jwtSecret) as IToken;
    if (!auth.user.id || !auth.user.role) {
      return ret;
    }
    const user = em.findOneOrFail(User, { id: auth.user.id });

    return { ...ret, auth, user };
  } catch (e) {
    return ret;
  }
}
