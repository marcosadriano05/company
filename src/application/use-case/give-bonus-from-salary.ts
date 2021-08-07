import { GiveBonus } from '../../domain/contracts'
import { Employee } from '../../domain/entities'
import { OutOfRangeParam } from '../../util/errors'

export class GiveBonusFromSalary implements GiveBonus {
  private employee: Employee

  constructor (employee: Employee) {
    this.employee = employee
  }

  async give (): Promise<number> {
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
