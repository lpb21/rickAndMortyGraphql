const { Sequelize, QueryTypes } = require("sequelize");
const tedious = require("tedious");
const { Config } = require("../src/config/index")

// *Conexion a BD MsSQL
const sequelizeMsSQL = new Sequelize (Config.mssql_db_name, Config.mssql_db_usr, Config.mssql_pass, {
  host: Config.mssql_host,//'localhost',
  dialect: Config.mssql_dialect,
  dialectModule: tedious,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 20000,
  },
  dialectOptions: {
    connectTimeout: 60000, // Tiempo de espera en milisegundos
  },
});

// * Verificacion de la autenticacion con MsSQL 
  async function mssql() {
  try {
    await sequelizeMsSQL.authenticate();
    console.log("conexion exitosa con mssql");
  } catch (error) {
    console.log("Error al conectar con mssql:", error);
  }
}
mssql();

module.exports = { 
  Sequelize, 
  sequelizeMsSQL
};
