# Rick and Morty GraphQL API

Este proyecto es una API basada en **GraphQL** para consultar y gestionar personajes de Rick and Morty. Utiliza **Express.js**, **Sequelize con MsSQL**, **Redis para caché**, y **GraphQL**.

## 🚀 Características
- **GraphQL**: Consulta y filtra personajes de manera eficiente.
- **Base de datos SQL**: Usa **MsSQL** con **Sequelize**.
- **Caché con Redis**: Mejora el rendimiento en consultas repetitivas.
- **Cron Jobs**: Actualización automática de personajes cada 12 horas.
- **Middleware de Logging**: Registra cada request con duración y detalles.
- **Pruebas Unitarias**: Implementadas con Jest.

## 🛠 Tecnologías Utilizadas
- **Node.js + Express.js**
- **GraphQL** (`express-graphql`)
- **Sequelize + MsSQL**
- **Redis** (`ioredis`)
- **Jest** para pruebas
- **Axios** para consumo de APIs
- **node-cron** para tareas programadas

---

## 📦 Instalación

### Requisitos Previos
- **Node.js** (v16+ recomendado)
- **Docker** (opcional para Redis y MsSQL)
- **Instancia de Redis corriendo**
- **Instancia de MsSQL con la base de datos creada (ver configuración)**

### Clonar el Repositorio
```sh
git clone https://github.com/lpb21/rickAndMortyGraphql.git
cd rickAndMortyBack
```

### Instalar Dependencias
```sh
npm install
```

### Configurar Variables de Entorno (`.env`)
Debes crear un archivo .env en la raíz del proyecto con los siguientes valores:
```env
PORT=3000
NODE_ENV=test npx jest
PORT_REDIS=6379
IP_REDIS=127.0.0.1
DB_NAME=RickAndMorty
DB_USER=usuario
DB_PASS=contraseña
DB_HOST=localhost
MSSQL_DB_DIALECT=mssql
```
### Crear la Base de Datos en MsSQL
```sh
CREATE DATABASE rickandmorty;

```

### Iniciar Redis (con Docker)
Si no tienes Redis instalado localmente, puedes ejecutarlo con:
```sh
docker run --name redis -p 6379:6379 -d redis
```

### Ejecutar el Servidor
```sh
npm start
```

---

## 🔥 Uso de la API GraphQL

La API se encuentra en:
```
http://localhost:3000/graphql
```
Puedes acceder a la UI de GraphQL en esta ruta para hacer consultas interactivas.

### 📌 Ejemplo de Query
```graphql
{
  characters(species: "Human", status: "Alive") {
    id
    name
    status
    species
    type
    gender
    origin
  }
}
```

### 📌 Respuesta Esperada
```json
{
  "data": {
    "characters": [
      {
        "name": "Rick Sanchez",
        "species": "Human",
        "origin": "Earth"
      }
    ]
  }
}
```

---

## 🛠 Estructura del Proyecto
```
📂 rickAndMortyGraphQL/
├── 📂 config/          # Configuración de la base de datos y Redis
│   ├── database.js     # Configuración de Sequelize
│   ├── redis.js        # Configuración de Redis
├── 📂 cron/            # Tareas programadas con node-cron
│   └── updateCharacters.js # Script para actualizar personajes periódicamente
├── 📂 graphql/         # Esquema y resolvers de GraphQL
│   ├── schema.js       # Definición del esquema GraphQL
│   └── resolver.js     # Resolvers de GraphQL
├── 📂 middlewares/     # Middlewares globales
│   └── logger.js       # Middleware de logging
├── 📂 models/         # Definición de modelos con Sequelize
│   └── character.js    # Modelo de personajes
├── 📂 scripts/        # Scripts de inicialización
│   └── seedDatabase.js # Poblar la base de datos con datos iniciales
├── 📂 services/       # Lógica de negocio y acceso a datos
│   ├── characterService.js # Servicio para personajes (incluye caché Redis)
├── 📂 src/config/     # Configuración adicional del proyecto
│   └── index.js
├── 📂 test/           # Pruebas unitarias con Jest
│   ├── character.test.js  # Pruebas de la lógica de personajes
│   ├── jest.setup.js      # Configuración de Jest
├── 📂 utils/             # Utilidades para pruebas
│   ├── decorators.js  # Decoradores y funciones auxiliares
├── .env               # Variables de entorno
├── .gitignore         # Archivos y carpetas a ignorar en Git
├── README.md          # Documentación del proyecto
├── package.json       # Dependencias y configuración del proyecto
├── package-lock.json  # Archivo de bloqueo de dependencias
└── server.js          # Punto de entrada del servidor

```

---

## ✅ Pruebas Unitarias
Ejecutar las pruebas con:
```sh
npm test
```

Las pruebas están en `tests/` y validan:
- **Filtrado de personajes** (`characterService.js`)
- **Conexión a Redis**
- **Integridad de GraphQL Schema**

---

## 🔄 Cron Job (Actualización Automática de Datos)
El sistema actualiza los personajes cada **12 horas** desde la API de Rick and Morty.

Ubicación: `cron/updateCharacters.js`

---

## 🏆 Contribución
Si deseas mejorar este proyecto, ¡haz un fork y envía un PR!
```sh
git checkout -b feature/nueva-mejora
git commit -m "Descripción de la mejora"
git push origin feature/nueva-mejora
```

🚀 ¡Gracias por revisar este proyecto! 🎉

