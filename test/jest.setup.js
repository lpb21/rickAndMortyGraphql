// Mock del modelo Character
jest.mock("../models/character", () => ({
    Character: {
      findAll: jest.fn(),
    },
  }));

// Mock de Redis para evitar conexiones reales en las pruebas 
  jest.mock("../config/redis", () => ({
    get: jest.fn().mockResolvedValue(null), // Simula un "cache miss"
    set: jest.fn(), // Simula un almacenamiento en caché sin efectos
    quit: jest.fn().mockResolvedValue(), // Simula el cierre de Redis correctamente
  }));

;