import { observable } from 'mobx';

class WeekStore {
  @observable
  weekId: string = '';
}

export const weekStore = new WeekStore();
