import {
    Model
} from 'sequelize';
import BossInfo from './BossInfo';

const tableList: (typeof Model)[] = [
    BossInfo
];

let init = false;

const dbInit = () => {
    if(init){
        console.log("DB is already initialized");
        return;
    }
    init = true;
    tableList.forEach((table) => {
        table.sync();
    });
};

export default dbInit;