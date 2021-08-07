import { Employee } from '../../domain/entities'
import { IncreaseSalary } from '../../domain/contracts'

export class IncreaseSalaryPerYear implements IncreaseSalary {
  private employee: Employee
  private readonly ONE_YEAR_IN_MS: number = 31556952000

  constructor (employee: Employee) {
    this.employee = employee
  }

  async increase (): Promise<Employee> {
    const admissionDate = this.employee.getAdmissionDate()
    const salary = this.employee.getSalary()

    if (Date.now() - admissionDate.getTime() < this.ONE_YEAR_IN_MS) {
      throw new Error('Employee must have more than one year in company')
    }

    this.employee.setSalary(salary * 1.05)
    return this.employee
  }
}
