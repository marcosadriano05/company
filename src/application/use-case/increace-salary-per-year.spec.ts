import { Employee } from '../../domain/entities'
import { IncreaseSalaryPerYear } from './increase-salary-per-year'

describe('Increase salary per year use case', () => {
  const employee = new Employee('Marcos', 3000)
  const increaseSalaryService = new IncreaseSalaryPerYear()

  test('Should increase the salary in 5% if the diference beetween salary readjustment date and actual date has more than one year', async () => {
    const ONE_YEAR_IN_MS = 31556952000
    const ONE_YEAR_AGO_IN_MS = Date.now() - ONE_YEAR_IN_MS
    const oneYearAgo = new Date(ONE_YEAR_AGO_IN_MS)
    employee.setSalaryReadjustmentDate(oneYearAgo)
    const updatedEmployee = await increaseSalaryService.increase(employee)
    expect(updatedEmployee.getSalary()).toBe(3150.00)
  })

  test('Should throw an error if the diference beetween salary readjustment date and actual date has more than one year', async () => {
    const LESS_THAN_A_YEAR_IN_MS = 31556951999
    const LESS_THAN_ONE_YEAR_AGO_IN_MS = Date.now() - LESS_THAN_A_YEAR_IN_MS
    const lessThanOneYearAgo = new Date(LESS_THAN_ONE_YEAR_AGO_IN_MS)
    employee.setSalaryReadjustmentDate(lessThanOneYearAgo)
    expect(increaseSalaryService.increase(employee)).rejects.toThrow(new Error('The range of readjustment date and the current date must be more than one year'))
  })

  test('Should update the salary readjustment date after increase salary', async () => {
    const ONE_YEAR_IN_MS = 31556952000
    const ONE_YEAR_AGO_IN_MS = Date.now() - ONE_YEAR_IN_MS
    const oneYearAgo = new Date(ONE_YEAR_AGO_IN_MS)
    employee.setSalaryReadjustmentDate(oneYearAgo)
    const updatedEmployee = await increaseSalaryService.increase(employee)
    const millisecondsDifference = updatedEmployee.getSalaryReadjustmentDate().getTime() - Date.now()
    expect(millisecondsDifference).toBe(0)
  })
})
