"use strict";
const express = require("express")
const { graphqlHTTP } = require("express-graphql");
const {schema} = require("./graphql/schema");
const resolvers  = require("./graphql/resolver");
const { sequelizeMsSQL } = require('./config/database');
const {seedDatabase} = require("./scripts/seedDatabase");
const { Config } = require("./src/config")
const cors = require('cors')
const bodyParser = require('body-parser')
const requestLogger = require('./middlewares/logger')

const app = express()

// Middleware para loguear requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });


app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "150mb" }));
app.use(requestLogger);

// 🚀 Endpoint de GraphQL
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: resolvers.Query,
      graphiql: true, // Habilita la UI de GraphQL para pruebas
    })
  );

  //🛑 Manejo de rutas no encontradas
  app.use((req, res) => {
    res.status(404).json({ message: "Not Found - Unauthorized" });
  });

  const startServer = async () => {
    try {
      await sequelizeMsSQL.sync();
      await seedDatabase(); // Poblar solo si es necesario
  
      app.listen(Config.port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${Config.port}/graphql`);
      });
    } catch (error) {
      console.error("❌ Error al sincronizar la base de datos:", error);
      process.exit(1); // Salir si hay un fallo crítico
    }
  };
  
  startServer();
