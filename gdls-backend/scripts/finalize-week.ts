import {Week} from "../src/week/models/Week";
import {createConnection} from "typeorm";
import {connectionOptions} from "../ormconfig/ormconfig";
import {closeActiveWeek} from "../src/week/services/close-active-week";

(async () => {
  const date = new Date();
  if (date.getDay() !== 6) {
    console.log('week can only be closed on saturday, quitting...');
    return;
  }

  const { manager: em } = await createConnection(connectionOptions);

  const week = await em.findOne(Week, { where: { isActive: true } });
  if (!week) {
    throw new Error('Missing active week');
  }

  await em.transaction(async t => closeActiveWeek(week, t));

  console.log('successfully closed week with id', week.id);
})();
