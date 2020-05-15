import {
  Model,
  INTEGER,
  CHAR,
  TINYINT,
} from 'sequelize';
import dbBase from './dbBase';

class BossInfo extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public class!: string;
  public refill!: boolean;
}

BossInfo.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: CHAR(45),
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
  class: {
    type: CHAR(45),
    allowNull: false,
  },
  refill: {
    type: TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'BossInfo',
  sequelize: dbBase,
  charset: 'utf8mb4',
});

export default BossInfo;
