import { addTwo } from "./index";

describe('Teste', () => {
  test('Deve retornar o número somado com 2', () => {
    const result = addTwo(2)
    expect(result).toBe(4)
  })
})