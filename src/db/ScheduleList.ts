import {
  Model,
  INTEGER,
  JSON as SeqJSON,
} from 'sequelize';
import dbBase from './dbBase';

class ScheduleList extends Model {
  public id!: number;
  public data!: { [key: string]: boolean };
  public views!: number;
}

ScheduleList.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: SeqJSON,
    allowNull: true,
  },
  views: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'ScheduleList',
  sequelize: dbBase,
  charset: 'utf8mb4',
});

export default ScheduleList;
