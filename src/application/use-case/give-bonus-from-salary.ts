import { GiveBonus } from '../../domain/contracts'
import { Employee } from '../../domain/entities'
import { OutOfRangeParam } from '../../util/errors'

export class GiveBonusFromSalary implements GiveBonus {
  async give (employee: Employee): Promise<number> {
    if (employee.getSalary() < 0) {
      throw new OutOfRangeParam('Salário não pode ser negativo')
    }
    if (employee.getSalary() >= 3000) {
      throw new OutOfRangeParam('Salário maior ou igual a R$3000,00 não recebe bônus')
    }
    if (employee.getSalary() < 1500) {
      return parseFloat((employee.getSalary() * 0.15).toFixed(2))
    }
    return parseFloat((employee.getSalary() * 0.1).toFixed(2))
  }
}
