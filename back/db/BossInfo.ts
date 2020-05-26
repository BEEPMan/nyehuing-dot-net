import {
    Model,
    INTEGER,
    CHAR,
    TINYINT
} from 'sequelize';
import dbBase from './dbBase';

class BossInfo extends Model {
    public group!: string;
    public name!: string;
    public price!: number;
    public type!: string;
    public refill!: boolean;
}

BossInfo.init({
    group: {
        type: CHAR(20),
        allowNull: true
    },
    name: {
        type: CHAR(45),
        allowNull: false
    },
    price: {
        type: INTEGER,
        allowNull: false
    },
    type: {
        type: CHAR(20),
        allowNull: false
    },
    refill: {
        type: TINYINT,
        allowNull: false
    }
}, {
    tableName: 'BossInfo',
    sequelize: dbBase,
    charset: 'utf8mb4'
});

export default BossInfo;