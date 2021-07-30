import { Employee } from '../../domain/entities'
import { IncreaseSalaryPerYear } from '../../domain/contracts'

class IncreaseSalaryService implements IncreaseSalaryPerYear {
  private employee: Employee
  private readonly ONE_YEAR_IN_MS: number = 31556952000

  constructor (employee: Employee) {
    this.employee = employee
  }

  async increase (): Promise<Employee> {
    const admissionDate = this.employee.getAdmissionDate()
    const salary = this.employee.getSalary()
    if (Date.now() - admissionDate.getTime() >= this.ONE_YEAR_IN_MS) {
      this.employee.setSalary(salary * 1.05)
    }
    return this.employee
  }
}

describe('Increase salary per year use case', () => {
  test('Should increase the salary in 5% if admission date has more than one year', async () => {
    const employee = new Employee('Marcos', 3000)
    const ONE_YEAR_IN_MS = 31556952000
    const ONE_YEAR_AGO_IN_MS = Date.now() - ONE_YEAR_IN_MS
    const oneYearAgo = new Date(ONE_YEAR_AGO_IN_MS)
    employee.setAdmissionDate(oneYearAgo)
    const increaseSalaryService = new IncreaseSalaryService(employee)
    const updatedEmployee = await increaseSalaryService.increase()
    expect(updatedEmployee.getSalary()).toBe(3150.00)
  })
})
