import pg from "pg";
import { SequelizeOptions } from "sequelize-typescript";
import { options } from "../../database/config/config.mjs";
import { Sequelize } from "sequelize";

const dbOptions = options as SequelizeOptions;
dbOptions.dialectModule = pg;
const sequelize = new Sequelize(dbOptions);

export default sequelize;
