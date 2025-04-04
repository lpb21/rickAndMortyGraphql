const { getFilteredCharacters } = require("../services/characterService");
const { Character } = require("../models/character");
const redisClient = require("../config/redis");


describe("getFilteredCharacters", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {}); // Silencia los logs
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it("debería devolver personajes filtrados por status", async () => {
    const mockData = [{ name: "Rick", status: "Alive" }];

    Character.findAll.mockResolvedValue(mockData);

    const result = await getFilteredCharacters({ status: "Alive" });

    expect(Character.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "Alive" }, raw: true })
    );
    expect(result).toEqual(mockData);
  });

  it("debería devolver un array vacío si no hay resultados", async () => {
    Character.findAll.mockResolvedValue([]);

    const result = await getFilteredCharacters({ status: "Dead" });

    expect(result).toEqual([]);
  });
});

// Cierra la conexión de Redis después de todas las pruebas
afterAll(async () => {
  await redisClient.quit(); // Cierra la conexión después de ejecutar todas las pruebas
  console.log.mockRestore(); // Restaura los logs después de cada prueba
});