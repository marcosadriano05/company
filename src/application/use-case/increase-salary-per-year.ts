import { Employee } from '../../domain/entities'
import { IncreaseSalary } from '../../domain/contracts'

export class IncreaseSalaryPerYear implements IncreaseSalary {
  private employee: Employee
  private readonly ONE_YEAR_IN_MS: number = 31556952000

  constructor (employee: Employee) {
    this.employee = employee
  }

  async increase (): Promise<Employee> {
    const salaryReadjustmentDate = this.employee.getSalaryReadjustmentDate()
    const salary = this.employee.getSalary()

    if (Date.now() - salaryReadjustmentDate.getTime() < this.ONE_YEAR_IN_MS) {
      throw new Error('The range of readjustment date and the current date must be more than one year')
    }

    this.employee.setSalary(salary * 1.05)
    this.employee.setSalaryReadjustmentDate(new Date(Date.now()))
    return this.employee
  }
}
