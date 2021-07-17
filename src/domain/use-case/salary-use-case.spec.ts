import { Employee } from '../entities/employee'
import { SalaryDomainService } from './salary'
import { OutOfRangeParam } from '../errors/out-of-range-param'

describe('Salary use case', () => {
  test('Should give a bonus of 10% if employee salary is lower than R$3000,00', () => {
    const employee = new Employee(2500)
    const salaryService = new SalaryDomainService(employee)
    salaryService.giveBonus()
    expect(employee.salary).toBe(2750)
  })

  test('Should give a bonus of 10% if employee salary is greater or equals than R$1500,00', () => {
    const employee = new Employee(1500)
    const salaryService = new SalaryDomainService(employee)
    salaryService.giveBonus()
    expect(employee.salary).toBe(1650)
  })

  test('Should give a bonus of 15% if employee salary is lower than R$1500,00', () => {
    const employee = new Employee(1000)
    const salaryService = new SalaryDomainService(employee)
    salaryService.giveBonus()
    expect(employee.salary).toBe(1150)
  })

  test('Should throw if employee salary is greater or equal than R$3000,00', async () => {
    const employee = new Employee(3000)
    const salaryService = new SalaryDomainService(employee)
    await expect(salaryService.giveBonus()).rejects.toThrow(new OutOfRangeParam('Salário maior ou igual a R$3000,00 não recebe bônus'))
  })

  test('Should throw if employee salary is negative', async () => {
    const employee = new Employee(-1)
    const salaryService = new SalaryDomainService(employee)
    await expect(salaryService.giveBonus()).rejects.toThrow(new OutOfRangeParam('Salário não pode ser negativo'))
  })
})
