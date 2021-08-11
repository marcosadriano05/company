import { Employee } from '../../domain/entities'
import { IncreaseSalaryPerYear } from './increase-salary-per-year'

describe('Increase salary per year use case', () => {
  const employee = new Employee('Marcos', 3000)

  test('Should increase the salary in 5% if the diference beetween salary readjustment date and actual date has more than one year', async () => {
    const ONE_YEAR_IN_MS = 31556952000
    const ONE_YEAR_AGO_IN_MS = Date.now() - ONE_YEAR_IN_MS
    const oneYearAgo = new Date(ONE_YEAR_AGO_IN_MS)
    employee.setSalaryReadjustmentDate(oneYearAgo)
    const increaseSalaryService = new IncreaseSalaryPerYear(employee)
    const updatedEmployee = await increaseSalaryService.increase()
    expect(updatedEmployee.getSalary()).toBe(3150.00)
  })

  test('Should throw an error if the diference beetween salary readjustment date and actual date has more than one year', async () => {
    const LESS_THAN_A_YEAR_IN_MS = 31556951999
    const LESS_THAN_ONE_YEAR_AGO_IN_MS = Date.now() - LESS_THAN_A_YEAR_IN_MS
    const lessThanOneYearAgo = new Date(LESS_THAN_ONE_YEAR_AGO_IN_MS)
    employee.setSalaryReadjustmentDate(lessThanOneYearAgo)
    const increaseSalaryService = new IncreaseSalaryPerYear(employee)
    expect(increaseSalaryService.increase()).rejects.toThrow(new Error('Employee must have more than one year in company'))
  })

  test('Should update the salary readjustment date after increase salary', async () => {
    const ONE_YEAR_IN_MS = 31556952000
    const ONE_YEAR_AGO_IN_MS = Date.now() - ONE_YEAR_IN_MS
    const oneYearAgo = new Date(ONE_YEAR_AGO_IN_MS)
    employee.setSalaryReadjustmentDate(oneYearAgo)
    const increaseSalaryService = new IncreaseSalaryPerYear(employee)
    const updatedEmployee = await increaseSalaryService.increase()
    const millisecondsMarginOfError = 100
    const millisecondsDifference = updatedEmployee.getSalaryReadjustmentDate().getTime() - Date.now()
    expect(millisecondsDifference).toBeLessThan(millisecondsMarginOfError)
  })
})
