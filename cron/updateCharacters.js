// cron/updateCharacters.js
const cron = require('node-cron');
const axios = require('axios');
const { Character } = require('../models/character');

const updateCharacters = async () => {
  try {
    console.log("🔄 Starting character update...");
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    if (!response.data || !response.data.results) {
      throw new Error("⚠️ Respuesta inválida de la API");
    }
    const characters = response.data.results.slice(0, 15);

    // Eliminar personajes antiguos solo si hay nuevos datos
    await Character.destroy({ where: {} });

    await Character.bulkCreate(
      characters.map(character => ({
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      origin: character.origin.name,
    })));

    console.log('✅ Characters updated successfully');
  } catch (error) {
    console.error('❌ Error updating characters: ', error);
  }
};

cron.schedule('0 */12 * * *', updateCharacters);
console.log("⏳ Scheduled task to update characters every 12 hours.");