import { Employee } from '../entities'

export interface IncreaseSalaryPerYear {
  increase: (employee: Employee) => Promise<void>
}
