import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    "username": "root",
    "password": "1234",
    "database": "nyehuing",
    "host": "localhost",
    "dialect": "mysql",
});

export default sequelize;