// scripts/seedDatabase.js
const axios = require('axios');
const { Character } = require('../models/character');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const seedDatabase = async () => {
  try {

    // Contar cuántos registros hay en la tabla
    const count = await Character.count();
    //console.log(10,count)

    if (count > 15) {
      console.log("⚠️ The database already has data, no need to insert data.");
      return;
    }

    await Character.sync();

    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results.slice(0, 15).map((char) => ({
        name: char.name,
        status: char.status,
        species: char.species,
        type: char.type || "",
        gender: char.gender,
        origin: char.origin.name,
        image: char.image,
      }));
      await Character.bulkCreate(characters);

    } catch (error) {
    console.error('Error seeding database: ', error);
  }
};

module.exports = {seedDatabase};