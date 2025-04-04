require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,
  port_redis: process.env.PORT_REDIS,
  ip_redis: process.env.IP_REDIS,

//* Variables SQL Server 
  mssql_db_name: process.env.MSSQL_DB_NAME,
  mssql_db_usr: process.env.MSSQL_DB_USER,
  mssql_pass: process.env.MSSQL_DB_PASS,
  mssql_host: process.env.MSSQL_DB_HOST,
  mssql_dialect: process.env.MSSQL_DB_DIALECT,
  
  //mssql_db: process.env.MSSQL_DB_NAME,
  //mssql_usr_adm: process.env.MSSQL_DB_USER_ADM,
  
  


  

};

