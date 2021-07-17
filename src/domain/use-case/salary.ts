import { Employee } from '../entities/employee'
import { OutOfRangeParam } from '../errors/out-of-range-param'

export class SalaryDomainService {
  private employee: Employee

  constructor (employee: Employee) {
    this.employee = employee
  }

  async giveBonus (): Promise<void> {
    if (this.employee.salary < 0) {
      throw new OutOfRangeParam('Salário não pode ser negativo')
    }
    if (this.employee.salary >= 3000) {
      throw new OutOfRangeParam('Salário maior ou igual a R$3000,00 não recebe bônus')
    }
    if (this.employee.salary < 1500) {
      this.employee.salary = parseFloat((this.employee.salary * 1.15).toFixed(2))
      return
    }
    if (this.employee.salary < 3000) {
      this.employee.salary = parseFloat((this.employee.salary * 1.1).toFixed(2))
    }
  }
}
