import { GiveBonusFromSalary } from '../contracts/give-bonus-from-salary'
import { Employee } from '../entities/employee'
import { OutOfRangeParam } from '../errors/out-of-range-param'

export class GiveBonusService implements GiveBonusFromSalary {
  private employee: Employee

  constructor (employee: Employee) {
    this.employee = employee
  }

  async exec (): Promise<number> {
    if (this.employee.getSalary() < 0) {
      throw new OutOfRangeParam('Salário não pode ser negativo')
    }
    if (this.employee.getSalary() >= 3000) {
      throw new OutOfRangeParam('Salário maior ou igual a R$3000,00 não recebe bônus')
    }
    if (this.employee.getSalary() < 1500) {
      return parseFloat((this.employee.getSalary() * 0.15).toFixed(2))
    }
    return parseFloat((this.employee.getSalary() * 0.1).toFixed(2))
  }
}
