import { Employee } from '../../domain/entities'
import { GiveBonusFromSalary } from './give-bonus-from-salary'
import { OutOfRangeParam } from '../../util/errors'

describe('Give bonus from salary use case', () => {
  const giveBonusService = new GiveBonusFromSalary()

  test('Should return a bonus of 10% if employee salary is lower than R$3000,00', () => {
    const employee = new Employee('Marcos', 2500)
    const bonus = giveBonusService.give(employee)
    expect(bonus).resolves.toBe(250)
  })

  test('Should return a bonus of 10% if employee salary is greater or equals than R$1500,00', () => {
    const employee = new Employee('Marcos', 1500)
    const bonus = giveBonusService.give(employee)
    expect(bonus).resolves.toBe(150)
  })

  test('Should return a bonus of 15% if employee salary is lower than R$1500,00', () => {
    const employee = new Employee('Marcos', 1000)
    const bonus = giveBonusService.give(employee)
    expect(bonus).resolves.toBe(150)
  })

  test('Should throw if employee salary is greater or equal than R$3000,00', async () => {
    const employee = new Employee('Marcos', 3000)
    await expect(giveBonusService.give(employee)).rejects.toThrow(new OutOfRangeParam('Salário maior ou igual a R$3000,00 não recebe bônus'))
  })

  test('Should throw if employee salary is negative', async () => {
    const employee = new Employee('Marcos', -1)
    await expect(giveBonusService.give(employee)).rejects.toThrow(new OutOfRangeParam('Salário não pode ser negativo'))
  })
})
