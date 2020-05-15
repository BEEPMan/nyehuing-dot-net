import {
  Model,
} from 'sequelize';
import BossInfo from './BossInfo';
import ScheduleList from './ScheduleList';

const tableLst: (typeof Model)[] = [
  BossInfo,
  ScheduleList,
];

let init = false;

const dbInitialize = () => {
  if (init) {
    console.log('database already initialized!');
    return;
  }
  init = true;
  // association define start

  // association define end
  tableLst.forEach((table) => {
    table.sync();
  });
};

export default dbInitialize;
