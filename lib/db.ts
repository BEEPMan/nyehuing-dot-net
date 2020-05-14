import * as mysql from 'mysql';
import * as db_config from '../config/db_config.json';

const db = mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
});
db.connect();

export default db;