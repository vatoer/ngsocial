import { DataSource, DataSourceOptions } from "typeorm";

const configFile = require("../config");

const env = process.env.NODE_ENV || "development";
const dataSourceOptions = configFile[env];

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
