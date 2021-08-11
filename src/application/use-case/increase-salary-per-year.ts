import { Employee } from '../../domain/entities'
import { IncreaseSalary } from '../../domain/contracts'

export class IncreaseSalaryPerYear implements IncreaseSalary {
  private readonly ONE_YEAR_IN_MS: number = 31556952000

  async increase (employee: Employee): Promise<Employee> {
    const salaryReadjustmentDate = employee.getSalaryReadjustmentDate()
    const salary = employee.getSalary()

    if (Date.now() - salaryReadjustmentDate.getTime() < this.ONE_YEAR_IN_MS) {
      throw new Error('The range of readjustment date and the current date must be more than one year')
    }

    employee.setSalary(salary * 1.05)
    employee.setSalaryReadjustmentDate(new Date(Date.now()))
    return employee
  }
}
