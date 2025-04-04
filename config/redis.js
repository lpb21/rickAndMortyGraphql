const { Config } = require("../src/config/index")


const redis = require('redis');
const redisClient = redis.createClient({
    socket: {
      host: Config.ip_redis, // O la IP donde tengas Redis
      port: Config.port_redis, // Puerto por defecto de Redis
    },
  });

  redisClient.on('error', (err) => {
  console.log("❌ Error en Redis:", err);
});

redisClient.on("connect", () => {
    console.log("✅ Conectado a Redis");
  });

  redisClient.connect().catch(console.error);

module.exports = redisClient;