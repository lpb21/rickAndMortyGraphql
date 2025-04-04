// graphql/resolver.js
const { getFilteredCharacters } = require("../services/characterService");

const resolvers = {
  Query: {
    characters: async (args) => {
      try {
        console.log("⚡ Running resolve characters with args:", args);
        return await getFilteredCharacters(args);
      } catch (error) {
        console.error("🚨 Error in solving:", error);
        throw new Error(error.message || "Error getting characters");
      }
    }
  }
};



module.exports = resolvers;