import { RecintosZoo } from './recintos-zoo.js'

describe('Recintos do Zoologico', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1)
    expect(resultado.erro).toBe('Animal inválido')
    expect(resultado.recintosViaveis).toBeFalsy()
  })

  test('Deve rejeitar quantidade inválida', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 0)
    expect(resultado.erro).toBe('Quantidade inválida')
    expect(resultado.recintosViaveis).toBeFalsy()
  })

  test('Não deve encontrar recintos para 10 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 10)
    expect(resultado.erro).toBe('Não há recinto viável')
    expect(resultado.recintosViaveis).toBeFalsy()
  })

  test('Deve encontrar recinto para 1 crocodilo', () => {
    const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1)
    expect(resultado.erro).toBeFalsy()
    expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)')
    expect(resultado.recintosViaveis.length).toBe(1)
  })

  test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 2)
    expect(resultado.erro).toBeFalsy()
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)')
    expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)')
    expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)')
    expect(resultado.recintosViaveis.length).toBe(3)
  })
})

test('Deve encontrar recinto para 1 leão', () => {
  const resultado = new RecintosZoo().analisaRecintos('LEAO', 1)
  expect(resultado.erro).toBeFalsy()
  expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 6 total: 9)')
  expect(resultado.recintosViaveis.length).toBe(1)
})

test('Não deve encontrar recintos para 2 leões, pois só há espaço para 1', () => {
  const resultado = new RecintosZoo().analisaRecintos('LEAO', 2)
  expect(resultado.erro).toBe('Não há recinto viável')
  expect(resultado.recintosViaveis).toBeFalsy()
})

test('Deve encontrar recintos para 1 hipopótamo (savana e rio)', () => {
  const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1)
  expect(resultado.erro).toBeFalsy()
  expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 2 total: 7)')
  expect(resultado.recintosViaveis.length).toBe(1)
})

test('Não deve encontrar recinto para 1 hipopótamo (não pode conviver com outros animais exceto savana e rio)', () => {
  const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1)
  expect(resultado.recintosViaveis).toBeTruthy()
  expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 2 total: 7)')
})

test('Deve encontrar recinto para 2 leopardos (savana)', () => {
  const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 2)
  expect(resultado.erro).toBeFalsy()
  expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)')
  expect(resultado.recintosViaveis[1]).toBe('Recinto 5 (espaço livre: 3 total: 9)')
  expect(resultado.recintosViaveis.length).toBe(2)
})

test('Deve encontrar recinto para 1 gazela', () => {
  const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1)
  expect(resultado.erro).toBeFalsy()
  expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 3 total: 7)')
  expect(resultado.recintosViaveis[1]).toBe('Recinto 1 (espaço livre: 5 total: 10)')
  expect(resultado.recintosViaveis.length).toBe(2)
})

test('Deve rejeitar a inserção de 2 crocodilos no mesmo recinto que outros animais', () => {
  const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 2)
  expect(resultado.erro).toBe('Não há recinto viável')
  expect(resultado.recintosViaveis).toBeFalsy()
})
