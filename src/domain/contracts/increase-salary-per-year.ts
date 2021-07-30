import { Employee } from '../entities'

export interface IncreaseSalaryPerYear {
  increase: () => Promise<Employee>
}
