import fs from "fs";
import path from "path";
import csv from "csvtojson";
import {Week} from "../models/Week";
import {User} from "../../user/models/User";
import {Round} from "../../round/models/Round";
import {EntityManager} from "typeorm";
import {Year} from "../../year/models/Year";

interface IImportRoundData {
  USER: string;
  SCORE: string;
  '$': string;
  'W/L': string;
}

export async function importWeek(em: EntityManager, name: string, weekNumber: number, year: Year) {
  const weekCsv = fs.readFileSync(path.join(__dirname, '../initial-data', name), 'utf8');
  const roundsData = await csv().fromString(weekCsv) as IImportRoundData[];
  const oldWeek = await em.findOne(Week, { where: { weekNumber } });
  if (oldWeek) {
    await em.remove(oldWeek);
  }
  const week = new Week();
  week.weekNumber = weekNumber;
  week.year = Promise.resolve(year);
  week.isActive = false;
  await em.save(week);
  for (const roundData of roundsData) {
    const { USER, SCORE } = roundData;
    const user = await em.getRepository(User)
      .createQueryBuilder()
      .where("LOWER(email) = LOWER(:email)", { email: USER })
      .getOne();
    if (!user) {
      if (process.env.IGNORE_IMPORT_ERRORS === 'true') {
        continue;
      }
      throw new Error(`No user ${USER} in database`);
    }
    const round = new Round();
    round.user = Promise.resolve(user);
    round.score = parseInt(SCORE);
    round.week = Promise.resolve(week);
    await em.save(round);
  }
}
