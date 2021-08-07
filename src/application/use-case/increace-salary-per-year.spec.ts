import { Employee } from '../../domain/entities'
import { IncreaseSalaryService } from './increase-salary-per-year'

describe('Increase salary per year use case', () => {
  const employee = new Employee('Marcos', 3000)

  test('Should increase the salary in 5% if admission date has more than one year', async () => {
    const ONE_YEAR_IN_MS = 31556952000
    const ONE_YEAR_AGO_IN_MS = Date.now() - ONE_YEAR_IN_MS
    const oneYearAgo = new Date(ONE_YEAR_AGO_IN_MS)
    employee.setAdmissionDate(oneYearAgo)
    const increaseSalaryService = new IncreaseSalaryService(employee)
    const updatedEmployee = await increaseSalaryService.increase()
    expect(updatedEmployee.getSalary()).toBe(3150.00)
  })

  test('Should throw an error if admission date is less than one year', async () => {
    const LESS_THAN_A_YEAR_IN_MS = 31556951999
    const LESS_THAN_ONE_YEAR_AGO_IN_MS = Date.now() - LESS_THAN_A_YEAR_IN_MS
    const lessThanOneYearAgo = new Date(LESS_THAN_ONE_YEAR_AGO_IN_MS)
    employee.setAdmissionDate(lessThanOneYearAgo)
    const increaseSalaryService = new IncreaseSalaryService(employee)
    expect(increaseSalaryService.increase()).rejects.toThrow(new Error('Employee must have more than one year in company'))
  })
})
