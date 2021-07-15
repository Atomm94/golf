import {EntityManager} from "typeorm";
import {Week} from "../models/Week";
import {closeWeek} from "./close-week";

export async function closeActiveWeek(week: Week, em: EntityManager) {
  if (!week.isActive) {
    throw new Error('Only active weeks can be closed');
  }

  await closeWeek(week, em);

  const newWeek = new Week();
  newWeek.isActive = true;
  newWeek.weekNumber = week.weekNumber + 1;
  newWeek.year = Promise.resolve(await week.year);
  await em.save(newWeek);
}
