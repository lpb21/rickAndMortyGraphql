// services/characterService.js
const redisClient = require("../config/redis");
const { Character } = require("../models/character");
const executionTimer = require("../utils/decorators");

async function getFilteredCharacters(dataFilters = {}) {
  try {
    
    // Asegurar que dataFilters es un objeto válido
    if (!dataFilters || typeof dataFilters !== "object") {
      dataFilters = {};
    }

    // Limpiar filtros eliminando valores `undefined` o `null`
    const cleanFilters = Object.fromEntries(
      Object.entries(dataFilters).filter(([_, value]) => value !== undefined && value !== null)
    );

    // Generar una clave única para el caché basada en los filtros
    const cacheKey = `characters:${JSON.stringify(cleanFilters)}`;
    //console.log("🔑 Cache Key:", cacheKey);

    // Intentar recuperar datos de Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("💾 Cache hit! Devolviendo datos desde Redis.");
      return JSON.parse(cachedData);
    }
    console.log("🛢️ Cache miss! Consultando base de datos.");

    const result = await Character.findAll({
      where:cleanFilters,
      raw: true,
      logging: (sql) => console.log('📌 SQL:', sql) // Mostrar consulta real
    });

    // Si hay resultados, almacenarlos en caché con expiración de 1 hora
    if (result.length > 0) {
      await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 }); // 1 hora
      console.log("🗃️ Datos almacenados en Redis.");
    }

    return result;
    
  } catch (error) {
    console.error("❌ Error en characterService:", error);
    throw new Error(error.message || "Error al filtrar personajes");
  }
}

module.exports = {
  getFilteredCharacters: executionTimer(getFilteredCharacters, "getFilteredCharacters")
};